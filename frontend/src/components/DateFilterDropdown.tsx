import React, { useState, useEffect, useRef } from "react";

// Interface for DateFilterDropdown props
interface DateFilterDropdownProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const DateFilterDropdown: React.FC<DateFilterDropdownProps> = ({
                                                                 startDate,
                                                                 endDate,
                                                                 setStartDate,
                                                                 setEndDate,
                                                               }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
          filterRef.current &&
          !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Validate date inputs
  const validateDates = (start: string, end: string) => {
    console.log("Validating dates", { start, end });
    setDateError(null); // Reset error message before validation

    if (start && end && new Date(start) > new Date(end)) {
      setDateError("Start date cannot be after end date.");
      return;
    }

    const today = new Date();
    if ((start && new Date(start) > today) || (end && new Date(end) > today)) {
      setDateError("Please select a valid date range.");
    }
  };

  // Handle change in start date
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    validateDates(e.target.value, endDate);
  };

  // Handle change in end date
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    validateDates(startDate, e.target.value);
  };

  // Validate dates when dropdown is opened
  useEffect(() => {
    if (isOpen) {
      validateDates(startDate, endDate);
    }
  }, [isOpen, startDate, endDate]);

  // Reset filters
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setDateError(null); // Clear error on reset
    setIsOpen(false);
  };

  return (
      <div ref={filterRef} className="relative">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-purple-600 text-white p-2 rounded-lg"
        >
          Filter by Date
        </button>
        {isOpen && (
            <div className="absolute bg-white border rounded-lg p-4 mt-2 shadow-lg w-64 z-10">
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-gray-700">
                  Start Date:
                </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-700">
                  End Date:
                </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="border rounded p-2 w-full"
                />
              </div>

              {/* Error message */}
              {dateError && <div className="text-red-500 mb-4">{dateError}</div>}

              <button
                  onClick={resetFilters}
                  className="text-purple-600 hover:underline w-full"
              >
                Reset Filters
              </button>
            </div>
        )}
      </div>
  );
};

export default DateFilterDropdown;