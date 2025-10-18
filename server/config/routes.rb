Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    mount_devise_token_auth_for 'JobSeeker', at: 'jobseekers', as: :job_seekers do
    # Define routes for JobSeeker within this block.
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
