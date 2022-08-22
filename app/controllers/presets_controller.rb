
class PresetsController < ApplicationController
    # wrap_parameters format: [:grid]

    def index 
        presets = Preset.all 
        render json: presets
    end

    def show 
        preset = Preset.find(params[:id])
        render json: preset
    end

    def create
        # byebug
        preset = Preset.create!(preset_params)
        render json: preset, status: :created
    end

    def update
        preset = Preset.find(params[:id])
        preset.update(preset_params)
    end

    def destroy
        preset = Preset.find(params[:id])
        preset.destroy
        head :no_content
    end

    private

    def preset_params
        params.permit(:id, :user_id, :name, :length, :key, :mode, :tempo, :octave, :sound, :volume, :delay, :delayamt, :dist, :distamt, :reverb, :reverbamt, grid: [])
    end

end
