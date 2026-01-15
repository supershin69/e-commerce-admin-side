import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import LowStockItem from '@/app/models/lowStockModel';
import { useEffect, useState } from 'react';
import { fetchLowStockItems } from '@/app/lib/fetchLowStockItems';

const columns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1},
    { field: 'created_at', headerName: 'Created At', width: 160, valueFormatter: (value) => new Date(value).toLocaleDateString() },
    { field: 'updated_at', headerName: 'Updated At', width: 160, valueFormatter: (value) => new Date(value).toLocaleDateString() },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function LowStockItems() {
    const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([]);
      const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLowStockItems = async () => {
            const items = await fetchLowStockItems();
            setLowStockItems(items);
            setLoading(false);
        };

        getLowStockItems();
    }, []);

    return (
        <Paper sx={{ height: 'auto', width: '100%', borderRadius: 4 }}>
            <Box sx={{ height: '100%', width: '100%', minWidth: 0 }}>
            <DataGrid
                autoHeight
                rows={lowStockItems}
                columns={columns}
                loading={loading}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Box>
        </Paper>
    );
}