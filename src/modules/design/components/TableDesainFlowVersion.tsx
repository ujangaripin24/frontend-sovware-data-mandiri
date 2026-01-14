import React, { useEffect } from 'react'
import { useDesignClassStore } from '../designSession.store'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import DesainFlowVersionForm from './DesainFlowVersionForm';

const TableDesainFlowVersion: React.FC = () => {
  const { dataFlow, loadDesainFlow, openModalFlow, selectedFlow } = useDesignClassStore();

  useEffect(() => {
    loadDesainFlow();
  }, [loadDesainFlow]);

  return (
    <div className="max-h-[300px] overflow-y-auto rounded-lg border border-divider">
      <Table
        aria-label="Table Design Flow"
        isHeaderSticky
        removeWrapper
        selectionMode="single"
        onRowAction={(key) => {
          const item = dataFlow.find((f) => f.id === Number(key));
          if (item) openModalFlow(item);
        }}
      >
        <TableHeader>
          <TableColumn>Version</TableColumn>
          <TableColumn>Design Name </TableColumn>
          <TableColumn>Status </TableColumn>
          <TableColumn>Comment </TableColumn>
          <TableColumn>Last Update </TableColumn>
        </TableHeader>
        <TableBody items={dataFlow} emptyContent={"Tidak ada data tersedia"}>
          {(item) => (
            <TableRow
              key={item.id}
              className={`cursor-pointer hover:bg-gray-100 ${selectedFlow?.id === item.id ? "bg-blue-50" : ""
                }`}
              onClick={() => openModalFlow(item)}
            >
              <TableCell>{item.version}</TableCell>
              <TableCell>{item.desainName}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.comment}</TableCell>
              <TableCell>{item.last_updated}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DesainFlowVersionForm />
    </div>
  )
}

export default TableDesainFlowVersion