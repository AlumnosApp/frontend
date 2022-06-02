import React, {useMemo} from 'react';
import DataGrid, {MasterDetail} from "devextreme-react/data-grid";
import GridColumns from "./GridColumns";


const CustomDataGrid = ({ customizeColumns, columns, allowAdding, allowDeleting, allowUpdating, dataSource, onChangeAny, onNewRowDefaults, editorMode, reference, customProps = {}, children, masterDetail, autoExpand }) => {
    const finalProps = useMemo(() => {
        return {...properties({customizeColumns, dataSource, allowAdding, allowDeleting, allowUpdating, onChangeAny, onNewRowDefaults, editorMode}), ...customProps}
    }, [])
    return (
        <DataGrid ref={reference}{...finalProps}>
            {
                GridColumns({columns})
            }
            {
                masterDetail && (
                    <MasterDetail enabled={true} component={masterDetail} autoExpandAll={autoExpand}/>
                )
            }
            {children}
        </DataGrid>
    );
};

const properties = ({customizeColumns, dataSource, onChangeAny, allowAdding = true, allowDeleting= true, allowUpdating= true, onNewRowDefaults = {}, editorMode = 'cell'}) => ({
    loadPanel: {
        enabled: true,
        animation: true,
    },

    remoteOperations: true,
    allowColumnResizing: true,
    highlightChanges: false,
    activeStateEnabled: false,
    cellHintEnabled: false,
    autoNavigateToFocusedRow: false,
    hoverStateEnabled: false,
    defaultSearchPanel: {
        visible: true,
        placeholder: 'Buscar'
    },
    defaultEditing: {
        mode: editorMode,
        allowAdding: allowAdding,
        allowDeleting: allowDeleting,
        allowUpdating: allowUpdating,
        useIcons: true,
        confirmDelete: false,
        editColumnName: true,
        texts: {
            addRow: "Añadir",
            cancelAllChanges: "Cancelar",
            cancelRowChanges: "Cancelar",
            confirmDeleteMessage: "¿Está seguro de que desea eliminar este registro?",
            deleteRow: "Eliminar",
            editRow: "Editar",
            saveAllChanges: "Guardar",
            saveRowChanges: "Guardar",
            undeleteRow: "Deshacer eliminación",
            validationCancelChanges: "Cancelar",
        }
    },
    repaintChangesOnly: true,
    showBorders: true,
    columnAutoWidth: true,
    wordWrapEnabled: true,
    allowColumnReordering: true,
    showColumnLines: true,
    columnResizingMode: 'widget',
    customizeColumns: (columns) => {
        columns.filter(column => column.dataField === 'id').forEach(column => {
            column.allowEditing = false;
            column.sortOrder = 'desc';
            column.visible = false;
            column.allowResizing = false;
            column.allowReordering = false;
        });

        columns.filter(column => column.dataField === 'createdAt' ||  column.dataField === 'updatedAt').forEach(column => {
            column.visible = false;
            column.allowEditing = false;
        })

        if (customizeColumns) {
            Object.keys(customizeColumns).forEach(name => {
                columns.filter(column => column.dataField === name).forEach(column => {
                    customizeColumns[name](column);
                })
            })
        }
    },
    columnChooser: {
        enabled: true,
        allowSearch: true,
        mode: "select",
        title: "Selecciona las columnas",
        emptyPanelText: "No hay columnas que mostrar",
    },
    dataSource: dataSource,
    onRowUpdated: onChangeAny,
    onRowInserted: onChangeAny,
    onRowRemoved: onChangeAny,
    onInitNewRow: e => {
        e.data = onNewRowDefaults;
    }
})

export default React.memo(CustomDataGrid);
