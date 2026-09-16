import { ReactNode } from "react";

export interface IColumn<T> {
	header: string;
	accessor: (row: T) => ReactNode;
	className?: string;
}

interface IDataTableProps<T> {
	columns: IColumn<T>[];
	data: T[];
	rowKey: (row: T) => string;
}

export default function DataTable<T>({ columns, data, rowKey }: IDataTableProps<T>) {
	return (
		<table className="w-full text-sm">
			<thead>
				<tr className="text-default-400 text-left uppercase text-xs">
					{columns.map((column) => (
						<th key={column.header} className="font-normal pb-3">
							{column.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={rowKey(row)} className="border-t border-default-100">
						{columns.map((column) => (
							<td key={column.header} className={`py-3 ${column.className ?? ""}`}>
								{column.accessor(row)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
