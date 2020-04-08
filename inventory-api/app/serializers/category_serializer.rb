class CategorySerializer < ActiveModel::Serializer
  has_many :items
  attributes :id, :title, :description
end
