export interface RecipeModel {
    name: string;
    nonVeg: boolean;
    type: RecipeType;
    ingredients: string;
    steps: string
    CreatedBy: string
}

export type RecipeType = "Starter" | "Main Course" | "Dessert"

export const RecipeTypeArray: string[] = ["Starter", "Main Course", "Dessert"]
