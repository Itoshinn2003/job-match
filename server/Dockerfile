# syntax = docker/dockerfile:1

# 使用するベースイメージを指定
FROM ruby:3.4.1-slim AS base
# Rails appの作業ディレクトリ
# コンテナ内のディレクトリでこの先のコードたちは/backで行われるよ的なやつ
WORKDIR /server

# 環境変数を設定
ENV RAILS_ENV="development" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="production"

# Node.js と npm をインストール (NodeSource リポジトリを使用)
FROM base AS build

# デプロイに必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libsqlite3-0 libvips && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# RUN apt-get update -qq && \
# apt-get install -y  libmariadb-dev libpq-dev libxml2-dev libxslt-dev libvips-dev pkg-config libsqlite3-dev && \
# apt-get install -y build-essential make  
# apt-get clean
RUN apt-get update -qq && \
    apt-get install -y  build-essential libmariadb-dev libpq-dev libxml2-dev libxslt-dev libvips-dev pkg-config libsqlite3-dev && \
    apt-get clean

# Gemfile と Gemfile.lock をコピーして依存関係をインストール
COPY Gemfile .
COPY Gemfile.lock .
RUN chown -R root:root /usr/local/bundle && \
    chmod -R 777 /usr/local/bundle && \
    gem install foreman && \
    gem install bundler -v 2.5.23 && \
    bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# アプリケーションコードをコピー
COPY . /server

# Bootsnap のコードをプリコンパイル
RUN bundle exec bootsnap precompile app/ lib/

# 最終的なアプリケーション用のステージ
FROM base

# デプロイに必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libsqlite3-0 libvips && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

RUN apt-get update -qq && \
    apt-get install -y  build-essential libmariadb-dev libpq-dev libxml2-dev libxslt-dev libvips-dev pkg-config libsqlite3-dev && \
    apt-get clean


RUN apt-get update -qq && \
    apt-get install -y curl gnupg2 lsb-release && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install nodejs -y 


# ビルドしたアーティファクトをコピー
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /server /server

# 権限を設定
RUN chown -R root:root /usr/local/bundle
RUN chmod -R 777 /usr/local/bundle

# # エントリーポイントを設定
# ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# # デフォルトでサーバを起動 (必要に応じて上書き可能)
# EXPOSE 3000
# CMD ["./bin/rails", "server"]