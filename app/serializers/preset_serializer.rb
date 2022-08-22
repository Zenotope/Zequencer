class PresetSerializer < ActiveModel::Serializer
   attributes :id, :user_id, :name, :grid, :length, :tempo, :key, :mode, :octave, :sound, :volume, :delay, :delayamt, :dist, :distamt, :reverb, :reverbamt
end
