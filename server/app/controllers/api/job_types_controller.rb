class Api::JobTypesController < ApplicationController
    def index
        render json: { job_types: JobType.all.as_json(only: %i[id name])}
    end
end
