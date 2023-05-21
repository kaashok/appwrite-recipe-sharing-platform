export interface RecipeModel {
    name: string;
    nonVeg: boolean;
    type: RecipeType;
    ingredients: string;
    steps: string
}

export type RecipeType = "Starter" | "Main Course" | "Desert"

export const RecipeTypeArray: string[] = ["Starter", "Main Course", "Desert"]
