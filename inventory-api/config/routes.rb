Rails.application.routes.draw do
  resources :items, only: [:index,:show, :update, :create, :destroy]
  resources :categories, only: [:index,:show, :update, :create, :destroy]
  resource :categories do
    resource :items
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
