class ItemSerializer < ActiveModel::Serializer
  belongs_to :category
  attributes :id, :name, :quantity, :color, :details
end
