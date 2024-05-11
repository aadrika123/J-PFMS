"use client";

import React, { useEffect, useState } from "react";

import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import DebouncedSearchForSearchPanel from "../../../app/project-management/(inbox)/DebouncedSearchForSearchPanel";
import { ResetButton } from "../../../app/project-management/(inbox)/ResetButton";
import CloseButton from "../../../app/project-management/(inbox)/CloseButton";

// import "../css/szh-accordion.css";

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}

        <div
          className={`ml-auto transition-transform duration-200 ease-out ${isEnter && "rotate-180"
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </>
    )}
    className="border-b"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left hover:bg-slate-100 ${isEnter && "bg-slate-200"
        }`
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out"
    }}
    panelProps={{ className: "p-4" }}

  />
);

interface SearchPanelItem {
  name: string;
  caption: string;
}

interface SearchPanelItemValues {
  [key: string]: string[];
}

interface SearchPanelProps {
  onClose: () => void;
  items: SearchPanelItem[],
  values: SearchPanelItemValues
  onFilterChange: (filters: any) => void
  onNoFilter: () => void
}

const SearchPanel = ({ onClose, items, values, onFilterChange, onNoFilter}: SearchPanelProps) => {

  const [filterFormKey, setFilterFormKey] = useState<number>(1);
  const [checkboxContainerKey, setCheckboxContainerKey] = useState<number>(1);

  const [filterItems] = useState<any>({});
  const [filters, setFilters] = useState<any>({});



  // will keep reference to the checkboxes, to be able to clear them later
  const setCheckboxRef = (name: string, value: string, element: any) => {
    // console.log("ref: ", name,  value, element);

    if (!(name in filterItems))
      filterItems[name] = {};

    if (!('values' in filterItems[name]))
      filterItems[name]['values'] = {};

    filterItems[name]['values'][value] = element;

    // console.log(filterItems);
  };

  // will keep reference to the searchboxes, to be able to clear them later
  const setSearchboxRef = (name: string, element: any) => {
    // console.log("ref: ", name, element);

    if (!(name in filterItems))
      filterItems[name] = {};

    filterItems[name]['search'] = element;

    // console.log(filterItems);
  }


  const onCheckboxClick = (name: string, value: string, checked: boolean) => {
    // console.log(name, value, checked);

    // empty the search field

    const updatedFilters = { ...filters };

    // remove the search condition from the filter
    if (name in filterItems) {
      if ('search' in filterItems[name]) {
        const textBox: HTMLInputElement = filterItems[name]['search'];
        console.log(textBox);
        textBox.value = "";
      }
    }

    // add a new item to the list of values if a list already exists
    if (name in filters) {
      let values: string[] = [];

      if (typeof updatedFilters[name] != 'string')
        values = updatedFilters[name];

      // add the item to the list if it does not exist
      if (checked && !values.includes(value)) {
        values.push(value);
        updatedFilters[name] = values;
      } else {
        // remove the value
        const remainingValues = values.filter(function (e) { return e !== value });

        if (remainingValues.length == 0)
          delete updatedFilters[name];
        else
          updatedFilters[name] = remainingValues;

      }

    } else {
      updatedFilters[name] = [value];
    }
    // console.log(updatedFilters);
    setFilters(updatedFilters);
  }

  const onSearchTextChanged = (name: string, text: string) => {
    // console.log(name, text);
    // console.log(name);

    // console.log(filterItems[name]);

    // uncheck the checkboxes for the field

    // clear the checkbox list
    setCheckboxContainerKey(checkboxContainerKey + 1);
    



    const updatedFilters = { ...filters };
    // remove the value filter from the field

    if (text.length > 0)
      updatedFilters[name] = text;
    else
      delete updatedFilters[name];

    setFilters(updatedFilters);

    console.log(updatedFilters);


  }

  const resetFilters = () => {
    setFilterFormKey(filterFormKey+1);
    setFilters({});
    onNoFilter();
  }

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  return (
    <div style={{ height: "calc(100vh - 3.5rem)" }} className="border-2 p-2">
      <div className="flex justify-between">
        <div>Filters</div>
        <button onClick={onClose}><CloseButton /></button>
      </div>
      <section>
        <div className="mt-4 flex flex-col">
          <div>
            <Accordion allowMultiple transitionTimeout={200} key={`filterForm${filterFormKey}`}>


              {items?.map((item: any, index: number) => {
                return (
                  <>
                    <AccordionItem header={item.caption} initialEntered={index == 0}>
                      <DebouncedSearchForSearchPanel onRef={(element: any) => { setSearchboxRef(item.name, element) }} onChange={(text) => onSearchTextChanged(item.name, text)} />

                      <div key={`checkboxContainer${checkboxContainerKey}`}>
                      {values[item.name]?.map((value: string) => {
                        return (
                          <>
                            <div>
                              <input id={`${item.name}${value}`} ref={(element: any) => { setCheckboxRef(item.name, value, element) }} type="checkbox" onChange={(event) => { onCheckboxClick(item.name, value, event.target.checked) }} />
                              <label htmlFor={`${item.name}${value}`}>{value}</label>
                            </div>
                          </>
                        );
                      })}

                      </div>
                      
                    </AccordionItem>
                  </>
                );
              })}
            </Accordion>
          </div>

          <div className="flex justify-center mt-10">
            <ResetButton onClick={resetFilters} />
          </div>


        </div>
      </section>
    </div>
  );
};

export default SearchPanel;
