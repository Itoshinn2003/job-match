class Api::PrefecturesController < ApplicationController
    def index
        render json: { prefectures: Prefecture.all.as_json(only: %i[id name])}
    end
end
