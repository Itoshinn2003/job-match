ActiveSupport.on_load(:action_controller) do
    wrap_parameters format: []  # JSONで自動ラップしない
  end