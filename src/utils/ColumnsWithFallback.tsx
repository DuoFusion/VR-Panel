import { ColumnsType, ColumnType } from "antd/es/table";

export function ColumnsWithFallback<T>(columns: ColumnsType<T>): ColumnsType<T> {
  return columns.map((col: ColumnType<T>) =>
    col.render
      ? col
      : {
          ...col,
          render: (val: any) => (val !== null && val !== undefined && val !== "" ? val : "-"),
        }
  );
}
