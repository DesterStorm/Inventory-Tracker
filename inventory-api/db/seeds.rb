# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Category.create([
                { id: 1, title: 'Kitchen', description: 'Items found in the kitchen' },
                { id: 2, title: 'Bar', description: 'Types of alcohol found in our bar' }
            ])

Item.create([
                    { name: 'Spoon',
                      quantity: 20,
                      color: 'silver',
                      details: 'located in the top right drawer of the island',
                      category_id: 1
                    }
                ])