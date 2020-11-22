import React from "react";

const Table = ({headers, data}) => {

	const renderTableRow = (obj) => {
		return(
			<tr key={`row-${obj.id}`}>
				{Object.keys(obj).map((prop) = (<td key={} ></td>))}
                    <td data-testid={`titulo-${obj.id}`} key={`titulo-${obj.id}`}>{obj.titulo}</td>
                    <td data-testid={`valor-${obj.id}`} key={`valor-${obj.id}`}>{obj.preco}</td>
            </tr>
		);
	};

	return(
		<table class="table table-dark">
			<thead>
				<tr>
					{Object.keys(headers).map((prop) => (<th key={headers[`${prop}`].key} data-testid={}>{headers[`${prop}`].label}</th>) )}
				</tr>
			</thead>
			<tbody>
				{servicos && servicos.map((obj) => tableRow(obj))}
			</tbody>
</table>
	);
}


       const tableRow = (obj) => {
        return (
                
        );
    };


export default Table;