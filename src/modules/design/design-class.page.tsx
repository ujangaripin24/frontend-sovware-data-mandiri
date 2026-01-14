import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { DesainIcon, SearchIcon } from "../../components/Icons";
import { useDesignClassStore } from "./designSession.store";
import DesignFlowVersionModal from "./components/DesignFlowVersionModal";

const DesignClassPage:React.FC = () => {
  const {
    paginatedClasses,
    totalPages,
    page,
    loadClasses,
    setSearch,
    setPage,
    selectedClass,
    selectClass,
    openModal,
  } = useDesignClassStore();

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <DesainIcon />
        <div>
          <div className="font-extrabold text-xl">DESIGN CLASS</div>
          <div className="text-sm">Select Your Class</div>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardBody>
            <Input
              placeholder="Search"
              startContent={<SearchIcon size={18} />}
              onChange={(e) => setSearch(e.target.value)}
              endContent={
                <Button
                  className="bg-[#2D68A2] text-white"
                  size="sm"
                  isDisabled={!selectedClass}
                  onPress={openModal}
                >
                  Open Class
                </Button>
              }
            />
          </CardBody>
        </Card>
      </div>

      <div className="p-4">
        <Table
          aria-label="Design Class Table"
          bottomContent={
            <div className="flex justify-end">
              <Pagination
                isCompact
                showControls
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>Class ID</TableColumn>
            <TableColumn>Number Of Agents</TableColumn>
          </TableHeader>

          <TableBody items={paginatedClasses}>
            {(item) => (
              <TableRow
                key={item.id}
                className={`cursor-pointer hover:bg-gray-100 ${selectedClass?.id === item.id ? "bg-blue-50" : ""
                  }`}
                onClick={() => selectClass(item)}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.agentCount}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DesignFlowVersionModal />
    </div>
  );
};

export default DesignClassPage;
