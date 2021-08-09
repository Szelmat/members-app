import DatePicker, { registerLocale } from "react-datepicker";
import hu from "date-fns/locale/hu";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("hu", hu);

export function CustomDatePicker(props) {
  return (
    <DatePicker
      selected={props.selected}
      onChange={props.onChange}
      dropdownMode="select"
      dateFormat="yyyy.MM.dd."
      todayButton="Ma"
      closeOnScroll={true}
      locale="hu"
      showMonthDropdown
      showYearDropdown
      disabledKeyboardNavigation
      filterDate={date => date < new Date()}
    />
  );
}
