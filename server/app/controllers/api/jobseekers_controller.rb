class Api::JobseekersController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    permitted = params.permit(:email, :password, :confirm_success_url)
    permitted.delete(:confirm_success_url)
    permitted
  end
end
