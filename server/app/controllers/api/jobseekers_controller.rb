class Api::JobseekersController < DeviseTokenAuth::RegistrationsController
    # def create
    #     p "aaaaa"

    #     json ={
    #         email: sign_up_params[:email],
    #         password: sign_up_params[:password]
    #     }
    #     render :json
    # end


    private
     def sign_up_params
         params.require(:registration).permit(:email, :password)
     end
end
