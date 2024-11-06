namespace ProdutosAPI.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public decimal PrecoCusto { get; set; }
        public decimal PrecoVenda { get; set; }
        public int Quantidade { get; set; }
    }
}
