export interface bond {
  Prefixo?: string;
  Loja?: string;
  ClasseValor?: string;
  Recno?: string;
  Numero?: string;
  ValorTitulo?: string;
  CentroCusto?: string;
  Codigo?: string;
  Conta?: string;
  Historico?: string;
  Valor?: string;
  Cliente?: string;
  Tipo?: string;
  Vencimento?: string;
  Parcela?: string;
  ItemCtb?: string;
  Filial?: string;
  Emissao?: string;
}

export interface bonds {
  TitulosAreceber?: bond[];
  PROXVENC?: string;
}
