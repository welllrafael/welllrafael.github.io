export interface Iten {
  VlrUnitario: number;
  Descricao: string;
  Quantidade: number;
  Item: string;
  Produto: string;
}

export interface purchase {
  ValorFat: number;
  Doc: string;
  Itens: Iten[];
  Serie: string;
  Emissao: string;
}

export interface purchases {
  Vendas: purchase[];
}
