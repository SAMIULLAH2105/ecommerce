import { filterOptions } from "@/config";
import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm ">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>

      <div className="p-4 space-y-4 ">
        {Object.keys(filterOptions).map((keyItem) => (
          <>
            <div>
              <h3 className="text-base font-semibold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex items-center gap-2 font-medium">
                    <Checkbox
                    // below checked is for when we refresh page it should remain not be lost we done that in listing handle filter but is was on storage not checked so will check hete
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&  // category or brand
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
