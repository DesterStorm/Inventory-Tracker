class CategoriesController < ApplicationController
  before_action :find_category, only: [:show, :edit, :update, :destroy]


  def index
    @categories = Category.all.order('title ASC')
    render json: @categories
  end

  def show
    @category = Category.find(params[:id])
    render json: @category, status: 200
  end

  def create
    @category = Category.create(category_params)
    render json: @category, status: 200
  end


  def update
    @category.update(category_params)
    if @category.save
      render json: @category, status: 200
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    category = Category.find_by(id: params[:id])
    category.destroy
    render json: category
  end


  private

  def category_params
    params.require(:category).permit(:title, :description)
  end

  def find_category
    @category = Category.find(params[:id])
  end
end
