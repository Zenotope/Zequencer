Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

get "/presets", to: "presets#index"
get "/presets/:id", to: "presets#show"
post "/presets", to: "presets#create"
patch "/presets/:id", to: "presets#update"
delete "/presets/:id", to: "presets#destroy"

get "/users", to: "users#index"
get "/users/:email", to: "users#show"
post "/users", to: "users#create"

end
