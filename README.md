# Hotel API
Uma aplicação profissional que permite a realização de check-ins em diferentes hotéis de forma simples e pratica.

## O que eu Aprendi durante este projeto?
- Aprendi a trabalhar com sistema de Login e Validação complexo
- Aprendi a trabalhar com tokens JWT 
- Conceitos de testagem autônoma envolvendo testes E2E 
- Conceitos de testagem autônoma envolvendo testes Unitários
- Conceitos de testagem autônoma envolvendo testes de Integração 
- Entendimentos de conceitos de Validações Geograficas e Temporais 
- Entendimento de principios SOLID



## requisitos 

### RF (requisitos funcionais)
	[ X ] Deve ser possivel se cadastrar
	[ X ] Deve ser possivel Logar-se na aplicação
	[ X ] Deve ser possível fazer Check-ins em hoteis
	[ X ] Deve ser possível Validar o check-in em um hotel 
	[ X ] Deve ser possível cadastrar um hotel 
	[ X ] Deve ser possivel Listar hotéis 
	[ X ] Deve ser possível listar hotéis por nome
	[   ] Deve ser possível Listar hotéis por avaliação 
	[ X ] Deve ser possível agendar check-ins em um hotel 
	[ X ] Deve ser possível listar o historico de checkIns de um usuario 
	[ X ] Deve ser possível receber o numero de checkIns de um usuario 
	[ X ] Deve ser possível listar a lista de checkIns validados de um hotel 
	[ X ] Deve ser possível listar a lista de checkIns não validados de um hotel 

### RN (Regras de Negócio)
	[ X ] Um usuario só pode realizar um check in em um hotel uma vez por dia
	[ X ] Um usuário só pode realizar check in em um hotel a uma distância de 2 km dele 
	[   ] Um usuário só pode realizar uma avaliaçao de um hotel se possuir pelomenos um checkIn neste hotel validado
	[   ] Um usuário só pode realizar checkIn, listar e avaliar hotéis se estiver logado(possuir token JWT ativo) 
	[   ] Um CheckIn só pode ser validado por um usuário com permissao de adiministrador 
	[ X ] A Senha do usuário deve estar criptografada 
	[ X ] Um Check-in só pode ser validado no mesmo dia em que foi criado 
	[ X ] O sistema de avaliaçao de hoteis deve consistir em uma lista de avaliaçoes que carregue o ID do usuário que avaliou e a avaliaçao.
	[ X ] A nota de um hotel deve consistir na média de avaliaçoes deste hotel 
	[ X ] Um Hotel só pode ser criado por um usuário com privilégio de adiministrador 
	[ X ] Todos os tipos de listagem devem estar paginados com 20 itens por página 

### RNFs (Requisitos não funcionais )

	[ X ] Os dados da aplicação precisam estar armazenados em um bando de dados portsgresql 
	[ + ] O usuario deve ser identificado por um JWT e suas informaçoes chaves devem ser armazenadas em cookies com seus tokens JWT
	[ X ] A Aplicação deve incluir suporte ao Swagger
	[ X ] A aplicaçao deve incluir variaveis de ambiente 
	[   ] A aplicaçao deve incluir sistema de testagem autonoma do vitest com coverage superior a 85% 
	[ X ] A Aplicaçao deve incluir erros customizados e tratativa de erro
	[   ] A Aplicaçao deve incluir banco de testes
	
	
	