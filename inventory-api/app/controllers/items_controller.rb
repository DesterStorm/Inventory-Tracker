class ItemsController < ApplicationController

  before_action :find_item, only: [:show, :edit, :update, :destroy]

  def index
    @items = Item.all.order('updated_at DESC')
    render json: @items
  end

  def show
    @item = Item.find(params[:id])
    render json: @item, status: 200
  end

  def create
    @item = Item.create(item_params)
    render json: @item, status: 200
  end


  def update
    @item.update(item_params)
    if @item.save
      render json: @item, status: 200
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    item = Item.find_by(id: params[:id])
    item.destroy
    render json: item
  end


  private

  def item_params
    params.require(:item).permit(:name, :quantity, :color, :details, :category_id)
  end

  def find_item
    @item = Item.find(params[:id])
  end

end
