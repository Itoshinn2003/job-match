const path = require('path');
const getVirtualFilePath = require('./getVirtualFilePath.js');
const {buildFile, transformFile, findExportNamesIn} = require('./esbuild.js');

const getBrowserConsoleCode = `
  let Logger;
  try {
    Logger = require('nightwatch').Logger;
  } catch (err) {
    Logger = {
      inspectObject(obj) {
        return obj;
      },
      colors: {
        light_cyan: msg => (msg),
        light_red: msg => (msg),
        stack_trace: msg => (msg)
      }
    };
  }
  
  
  const {browserName = ''} = browser.capabilities;
  if (browserName.toLowerCase() === 'chrome' || browserName.toLowerCase() === 'msedge') {
    try {
      cdpConnection = await browser.driver.createCDPConnection('page');
      cdpConnection._wsConnection.on('message', function(message) {
        try {
          const params = JSON.parse(message);
          if (params.method === 'Runtime.consoleAPICalled') {
            const consoleEventParams = params['params'];
            const {type, args} = consoleEventParams;
  
            if (args.length > 0 && args[0].type === 'string' && args[0].value.startsWith('%c')) {
              return;
            }
  
            const message = args.reduce((prev, item) => {
              if (item.type === 'string' || item.type === 'boolean' || item.type === 'number') {
                prev.push(item.value);
              } else if (item === undefined) {
                prev.push(undefined);
              } else if (item.type === 'object' || item.type === 'function') {
                prev.push(Logger.inspectObject({
                  [item.className]: item.description
                }));
              }
              
              return prev;
            }, []);
  
            if (typeof console[type] == 'function') {
              console[type](Logger.colors.light_cyan('[browser]'), ...message);
            }
          }
  
          if (params.method === 'Runtime.exceptionThrown') {
            const exceptionEventParams = params['params'];
            const {exceptionDetails = {}, timestamp} = exceptionEventParams;
            const {exception} = exceptionDetails;
  
            if (exception && exception.description) {
              const stackParts = exception.description.split('\\n');
              const errorTitle = stackParts.shift();
              const stackTrace = stackParts.join('\\n');
              console.error(Logger.colors.light_cyan('[browser]'), Logger.colors.light_red(errorTitle) + '\\n' + Logger.colors.stack_trace(stackTrace));
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
  
      cdpConnection.execute('Runtime.enable', {}, null);
    } catch (err) {
      
    }
    
  }
`;

const itFnAsync = function({name, exportName, createTest, onlyConditionFn = function() {}, modulePath, additionalTestData, modulePublicUrl}, argv) {
  return `
      
      it${addOnly(onlyConditionFn, {name, exportName, modulePath, modulePublicUrl}, argv)}('${typeof name === 'string' ? name : name(exportName)}', async function (browser) {
        const componentDefault = module.exports["default"];
        const component = module.exports["${exportName}"];
        let preRender = component && component.preRender || componentDefault && componentDefault.preRender; 
        let postRender = component && component.postRender || componentDefault && componentDefault.postRender; 
        
        if (preRender) {
          try {
            await preRender(browser, {
              id: '${additionalTestData.id}',
              name: '${exportName}',
              title: '${additionalTestData.name}'
            });
          } catch (err) {
            const error = new Error('► preRender test hook threw an error for "${additionalTestData.name}" story:');
            error.detailedErr = err.stack;
            error.stack = err.stack;
            
            throw error;
          }
        }
        
        const test = await Promise.resolve((${createTest.toString()})({
          data: ${JSON.stringify({exportName, modulePath, ...additionalTestData})},
          publicUrl: "${modulePublicUrl}",
          modulePath: "${modulePath}",
          exportName: "${exportName}",
        }));
        
        const mountResult = await Promise.resolve(test(browser));
        const data = mountResult || {};
        
        if (data.preRenderError) {
          console.error(data.preRenderError.message);
        }
          
        if (component && component.test) {
          if (data.component instanceof Error) {
            throw data.component;
          } else {
            await Promise.resolve(component.test(browser, data));
          }
        }
        
        if (data.postRenderError) {
          console.error(data.postRenderError.message);
        }
        
        if (postRender) {
          try {
            await postRender(browser, {
              id: '${additionalTestData.id}',
              name: '${exportName}',
              title: '${additionalTestData.name}'
            });
          } catch (err) {
            const error = new Error('► postRender test hook threw an error for "${additionalTestData.name}" story:');
            error.detailedErr = err.stack;
            error.stack = err.stack;
            
            throw error;
          }
        }
      }
    );`;
};

const addOnly = function(conditionFn, options, argv) {
  return conditionFn(options, argv) ? '.only': '';
};

/**
 * Creates a virtual test file
 *
 * @param {string} modulePath
 * @param {Object} description
 * @param {Object} argv
 * @param {Object} nightwatch_settings
 */
module.exports = async function (modulePath, {name, data = () => {}, showBrowserConsole = false, exports, createTest, transformCode = (code) => code, onlyConditionFn}, {
  argv = {}, nightwatch_settings = {}, metadata = {}
} = {}) {
  if (typeof createTest != 'function') {
    throw new Error('createTest function must be defined.');
  }

  const virtualFilePath = getVirtualFilePath(modulePath);
  const modulePublicUrl = modulePath.replace(process.cwd(), '').split(path.sep).join('/');
  const allModuleExports = await findExportNamesIn(modulePath);

  const exportNames = exports
    ? await Promise.resolve(exports(allModuleExports, modulePath))
    : allModuleExports.length <= 1
      ? allModuleExports
      : allModuleExports.filter((innerName) => innerName !== 'default');

  const result = await buildFile(modulePath, nightwatch_settings.esbuild || {});
  const {outputFiles: [{text}]} = result;

  const testItems = exportNames.map((exportName) => {
    const additionalTestData = data(exportName);
    const opts = {
      exportName, name, showBrowserConsole, createTest, additionalTestData, modulePath, onlyConditionFn, modulePublicUrl
    };

    return itFnAsync(opts, argv);
  });

  const browserConsoleCode = showBrowserConsole ? getBrowserConsoleCode: '';
  const describeFn = `describe((module.exports.default && module.exports.default.title) 
  ? module.exports.default.title 
  : '${path.basename(modulePath)} component', function () {
    let componentDefault;
    let cdpConnection;
    this.desiredCapabilities.pageLoadStrategy = 'eager';
    this.skipTestcasesOnFail = false;
    let testNamespace;
    
    try {
     componentDefault = module.exports.default;
     if (componentDefault && componentDefault.parameters) {
       testNamespace = componentDefault.parameters;
     }
           
  before(async function(browser) {
    ${browserConsoleCode}
       
    if (componentDefault && componentDefault.setup) {
      try {
        await componentDefault.setup(browser);
      } catch (err) {
        const error = new Error('► setup test hook threw an error:');
        error.detailedErr = err.stack;
        error.stack = err.stack;
      
        throw error;
      }
    }
  });      
     
     if (testNamespace && typeof testNamespace.beforeEach == 'function') {
       beforeEach(testNamespace.beforeEach);
     }
     
     if (testNamespace && typeof testNamespace.afterEach == 'function') {
       afterEach(testNamespace.afterEach);
     }
     
     after(async function(browser) {       
       if (componentDefault && componentDefault.teardown) {
        try {
          await componentDefault.teardown(browser);
        } catch (err) {
          const error = new Error('► teardown test hook threw an error:');
          error.detailedErr = err.stack;
          error.stack = err.stack;
        
          throw error;
        }
      }
     });
    } catch (err) {
      console.error('Error:', err);
    }
          
      ${testItems.join('\n')}
    });
    `;

  const {code} = await transformFile(`
    ${text}
    ${describeFn}
  `, virtualFilePath, path.extname(modulePath));


  return transformCode(code);
};