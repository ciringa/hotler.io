
## requisitos 

### RF (requisitos funcionais)
	[ X ] Deve ser possivel se cadastrar
	[   ] Deve ser possivel Logar-se na aplicação
	[   ] Deve ser possível fazer Check-ins em hoteis
	[   ] Deve ser possível Validar o check-in em um hotel 
	[ X ] Deve ser possível cadastrar um hotel 
	[ X ] Deve ser possivel Listar hotéis 
	[ X ] Deve ser possível listar hotéis por nome
	[   ] Deve ser possível Listar hotéis por avaliação 
	[ X ] Deve ser possível agendar check-ins em um hotel 
	[   ] Deve ser possível listar o historico de checkIns de um usuario 
	[   ] Deve ser possível receber o numero de checkIns de um usuario 
	[   ] Deve ser possível listar a lista de checkIns validados de um hotel 
	[   ] Deve ser possível listar a lista de checkIns não validados de um hotel 

### RN (Regras de Negócio)
	[   ] Um usuario só pode realizar um check in em um hotel uma vez por dia
	[   ] Um usuário só pode realizar check in em um hotel a uma distância de 2 km dele 
	[   ] Um usuário só pode realizar uma avaliaçao de um hotel se possuir pelomenos um checkIn neste hotel validado
	[   ] Um usuário só pode realizar checkIn, listar e avaliar hotéis se estiver logado(possuir token JWT ativo) 
	[   ] Um CheckIn só pode ser validado por um usuário com permissao de adiministrador 
	[ X ] A Senha do usuário deve estar criptografada 
	[   ] Um Check-in só pode ser validado no mesmo dia em que foi criado 
	[   ] O sistema de avaliaçao de hoteis deve consistir em uma lista de avaliaçoes que carregue o ID do usuário que avaliou e a avaliaçao.
	[   ] A nota de um hotel deve consistir na média de avaliaçoes deste hotel 
	[   ] Todos os tipos de listagem devem estar paginados com 20 itens por página 

### RNFs (Requisitos não funcionais )

	[   ] Os dados da aplicação precisam estar armazenados em um bando de dados portsgresql 
	[   ] O usuario deve ser identificado por um JWT e suas informaçoes chaves devem ser armazenadas em cookies com seus tokens JWT
	[   ] A Aplicação deve incluir suporte ao Swagger
	[   ] A aplicaçao deve incluir variaveis de ambiente 
	[   ] A aplicaçao deve incluir sistema de testagem autonoma do vitest com coverage superior a 85% 
	[   ] A Aplicaçao deve incluir erros customizados e tratativa de erro
	[   ] A Aplicaçao deve incluir banco de testes
	
	