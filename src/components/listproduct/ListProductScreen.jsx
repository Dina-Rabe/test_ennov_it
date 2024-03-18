import React, { useState,useMemo, useEffect } from 'react';
import { Sidebar, TopBar} from "../shared"
import { alertwithcalback, showalert } from "../../services/helpers/AlertComponent"
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { fetchProduct, fetchCategorie, updateProduct, deleteProduct } from "../../services/api/ProductServices"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListProductScreen() {
  const [validationErrors, setValidationErrors] = useState({});
  const [istloadigntable, setistloadigntable] = useState(true);
  const [activeid, setactiveid] = useState(null);
  const [categorie, setCategorie] = useState([])
  const [listproduct, setListproduct] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        let categorieall = await fetchCategorie();
        let product = await fetchProduct();
        setCategorie(categorieall.data)
        setListproduct(product.data)
        setistloadigntable(false)
    };
    fetchData();
  }, [setCategorie , setListproduct, setistloadigntable]);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
        },
      },
      {
        accessorKey: 'price',
        header: 'Price',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
            }),
        },
      },
      {
        accessorKey: 'category',
        header: 'Category',
        editVariant: 'select',
        editSelectOptions: categorie,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.category,
          helperText: validationErrors?.category,
        },
      },
      {
        accessorKey: 'description',
        header: 'description',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
    ],
    [validationErrors, categorie],
  );
  const validateRequired = (value) => !!value.length;
  function validateProduct(product) {
    return {
      title: !validateRequired(product.title)
        ? 'Title is Required'
        : '',
        description: !validateRequired(product.description)
        ? 'Description is Required'
        : '',
        category: !validateRequired(product.category)
        ? 'Category is Required'
        : '',
        price: !validateRequired(product.price)
        ? 'Price is Required'
        : '',
    };
  }
  const handleSaveProduct = async ({ values, table }) => {
    const newValidationErrors = validateProduct(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateProduct(values).then((data)=> {
      if (data.success){
          showalert("Update product!", `the product ${values.title}, has been saved.`, "success")
      }
      else {
          showalert("Error!", data.data, "error")
      }
    })
  };
  const deleteProduct = async ()=>{
    await deleteProduct(activeid).then((data)=> {
      if (data.success){
          showalert("Delete product!", `the product has been deleted.`, "success")
      }
      else {
          showalert("Error!", data.data, "error")
      }
      setactiveid(null)
    })
    
  }
  const openDeleteConfirmModal = (row) => {
    alertwithcalback(
      "delete product",
      `Are you sure you want to delete this product?`,
      "warning", deleteProduct
    )
  };
  const table = useMaterialReactTable({
    columns,
    data: listproduct,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveProduct,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Product</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: istloadigntable
    }
  });
  return (
    <>
        <div id="page-top">
            <div id="wrapper">
                <Sidebar page="Product" />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar />
                        <div className="container-fluid">
                          <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">list product</h1>
                          </div>
                          <MaterialReactTable table={table} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
)
}