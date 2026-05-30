interface ComparisonTableProps {
  title: string;
  columns: string[];
  rows: string[][];
  keyTakeaway: string;
}

export default function ComparisonTable({
  title,
  columns,
  rows,
  keyTakeaway,
}: ComparisonTableProps) {
  return (
    <div className="mb-4">
      <h4 className="text-base font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="bg-primary-50 text-left p-3 border-b border-gray-200 font-semibold text-primary-900 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`p-3 border-b border-gray-100 ${j === 0 ? "font-medium text-gray-700" : "text-gray-600"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        <span className="font-semibold">记忆要点：</span>
        {keyTakeaway}
      </p>
    </div>
  );
}
