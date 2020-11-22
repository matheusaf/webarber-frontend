import React from "react";

const Table = ({data}) => {

	const renderTableRow = (obj) => {
		return(
			<tr key={`row-${obj.id}`}>
				{Object.keys(obj).map((prop) =)}
                    <td data-testid={`titulo-${obj.id}`} key={`titulo-${obj.id}`}>{obj.titulo}</td>
                    <td data-testid={`valor-${obj.id}`} key={`valor-${obj.id}`}>{obj.preco}</td>
            </tr>
		);
	};

	return(
		<table class="table table-dark">
			<thead>
				<tr>
					<th key="titulo" data-testid="titulo">Titulo</th>
					<th key="valor" data-testid="Valor">Valor</th>
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