class UsersController < ApplicationController

    def index 
        users = User.all 
        render json: users
    end

    def show 
        user = User.find_by(params[:email])
        render json: user
    end

    def create
        # byebug
        user = User.create!(preset_params)
        render json: user, status: :created
    end

    private

    def preset_params
        params.permit(:id, :email, :first_name, :last_name, :sub)
    end

end
