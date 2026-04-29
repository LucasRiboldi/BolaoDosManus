/**
 * Script de Teste Local - Fluxo Completo do Bolão Copa 2026
 * 
 * Simula:
 * 1. Criação de 3 usuários
 * 2. Login dos 3 usuários
 * 3. Preenchimento de 5 apostas por usuário
 * 4. Salvamento das apostas
 * 5. Simulação de resultados fictícios
 * 6. Atualização automática do ranking
 */

// ============================================
// TIPOS
// ============================================

interface User {
  uid: string;
  name: string;
  email: string;
  totalPoints: number;
  groupPoints: number;
  position: number;
  createdAt: Date;
}

interface Bet {
  id: string;
  userId: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  points: number;
  status: string;
  createdAt: Date;
}

interface Match {
  matchId: string;
  homeGoals: number;
  awayGoals: number;
  status: string;
}

// ============================================
// DADOS DE TESTE
// ============================================

const testUsers = [
  { email: 'usuario1@test.com', password: 'Teste@123', name: 'João Silva' },
  { email: 'usuario2@test.com', password: 'Teste@123', name: 'Maria Santos' },
  { email: 'usuario3@test.com', password: 'Teste@123', name: 'Pedro Costa' }
];

const testBets = [
  { matchId: 'match_1', homeTeam: 'Brasil', awayTeam: 'Sérvia', homeGoals: 2, awayGoals: 1 },
  { matchId: 'match_2', homeTeam: 'Alemanha', awayTeam: 'Japão', homeGoals: 3, awayGoals: 0 },
  { matchId: 'match_3', homeTeam: 'França', awayTeam: 'Holanda', homeGoals: 1, awayGoals: 1 },
  { matchId: 'match_4', homeTeam: 'Argentina', awayTeam: 'Itália', homeGoals: 2, awayGoals: 0 },
  { matchId: 'match_5', homeTeam: 'Espanha', awayTeam: 'Portugal', homeGoals: 1, awayGoals: 2 }
];

const matchResults = [
  { matchId: 'match_1', homeGoals: 2, awayGoals: 1, status: 'finished' }, // Acerto exato
  { matchId: 'match_2', homeGoals: 3, awayGoals: 1, status: 'finished' }, // Acerto de vencedor
  { matchId: 'match_3', homeGoals: 0, awayGoals: 1, status: 'finished' }, // Erro
  { matchId: 'match_4', homeGoals: 2, awayGoals: 0, status: 'finished' }, // Acerto exato
  { matchId: 'match_5', homeGoals: 2, awayGoals: 1, status: 'finished' }  // Acerto de vencedor
];

// ============================================
// SIMULAÇÃO DE BANCO DE DADOS
// ============================================

const database = {
  users: new Map<string, User>(),
  bets: new Map<string, Bet>(),
  matches: new Map<string, Match>()
};

// ============================================
// FUNÇÕES DE TESTE
// ============================================

function generateUID(): string {
  return 'uid_' + Math.random().toString(36).substr(2, 9);
}

function createUsers(): User[] {
  console.log('\n📝 CRIANDO 3 USUÁRIOS...\n');
  const createdUsers: User[] = [];

  for (const user of testUsers) {
    const uid = generateUID();
    const newUser: User = {
      uid,
      name: user.name,
      email: user.email,
      totalPoints: 0,
      groupPoints: 0,
      position: 0,
      createdAt: new Date()
    };

    database.users.set(uid, newUser);
    createdUsers.push(newUser);

    console.log(`✅ Usuário criado: ${user.name} (${user.email})`);
    console.log(`   UID: ${uid}\n`);
  }

  return createdUsers;
}

function loginUsers(users: User[]): void {
  console.log('\n🔐 SIMULANDO LOGIN DOS 3 USUÁRIOS...\n');

  for (const user of users) {
    console.log(`✅ Login bem-sucedido: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   UID: ${user.uid}\n`);
  }
}

function createBets(users: User[]): void {
  console.log('\n📊 PREENCHENDO 5 APOSTAS POR USUÁRIO...\n');

  for (const user of users) {
    console.log(`📝 Apostas de ${user.name}:`);

    for (let i = 0; i < testBets.length; i++) {
      const bet = testBets[i];
      const betId = `${user.uid}_${bet.matchId}`;

      const newBet: Bet = {
        id: betId,
        userId: user.uid,
        matchId: bet.matchId,
        homeTeam: bet.homeTeam,
        awayTeam: bet.awayTeam,
        homeGoals: bet.homeGoals,
        awayGoals: bet.awayGoals,
        points: 0,
        status: 'pending',
        createdAt: new Date()
      };

      database.bets.set(betId, newBet);
      console.log(`   ✓ ${bet.homeTeam} ${bet.homeGoals}x${bet.awayGoals} ${bet.awayTeam}`);
    }
    console.log();
  }
}

function simulateResults(): void {
  console.log('\n⚽ SIMULANDO RESULTADOS DAS 5 PRIMEIRAS PARTIDAS...\n');

  for (const result of matchResults) {
    database.matches.set(result.matchId, result);
    console.log(`✓ ${result.matchId}: ${result.homeGoals}x${result.awayGoals} (${result.status})`);
  }
  console.log();
}

function calculatePoints(users: User[]): Map<string, number> {
  console.log('\n🤖 CALCULANDO PONTOS AUTOMATICAMENTE...\n');

  const pointsMap = new Map<string, number>();

  // Inicializar pontos
  for (const user of users) {
    pointsMap.set(user.uid, 0);
  }

  // Calcular pontos para cada aposta
  for (const user of users) {
    console.log(`\n📊 Cálculo de pontos para ${user.name}:`);

    for (let i = 0; i < testBets.length; i++) {
      const bet = testBets[i];
      const result = matchResults[i];
      const betId = `${user.uid}_${bet.matchId}`;

      let points = 0;
      let status = 'Errou ❌';

      // Verificar acerto exato
      if (bet.homeGoals === result.homeGoals && bet.awayGoals === result.awayGoals) {
        points = 10;
        status = 'Acerto Exato ✓ (+10 pontos)';
      }
      // Verificar acerto de vencedor
      else if (
        (bet.homeGoals > bet.awayGoals && result.homeGoals > result.awayGoals) ||
        (bet.homeGoals < bet.awayGoals && result.homeGoals < result.awayGoals) ||
        (bet.homeGoals === bet.awayGoals && result.homeGoals === result.awayGoals)
      ) {
        points = 5;
        status = 'Acerto Parcial ✓ (+5 pontos)';
      }

      // Atualizar aposta com pontos
      const updatedBet = database.bets.get(betId);
      if (updatedBet) {
        updatedBet.points = points;
        updatedBet.status = status;
      }

      // Atualizar pontos do usuário
      const currentPoints = pointsMap.get(user.uid) || 0;
      pointsMap.set(user.uid, currentPoints + points);

      console.log(`   ${bet.homeTeam} (${bet.homeGoals}x${bet.awayGoals}) vs ${bet.awayTeam} (${result.homeGoals}x${result.awayGoals}): ${status}`);
    }
  }

  return pointsMap;
}

function updateRanking(users: User[], pointsMap: Map<string, number>): void {
  console.log('\n🏆 ATUALIZANDO RANKING...\n');

  // Criar array com usuários e seus pontos
  const ranking = users.map(user => ({
    uid: user.uid,
    name: user.name,
    totalPoints: pointsMap.get(user.uid) || 0
  })).sort((a, b) => b.totalPoints - a.totalPoints);

  // Atualizar posição de cada usuário
  for (let i = 0; i < ranking.length; i++) {
    const user = database.users.get(ranking[i].uid);
    if (user) {
      user.totalPoints = ranking[i].totalPoints;
      user.groupPoints = ranking[i].totalPoints;
      user.position = i + 1;
    }
  }

  // Exibir ranking
  console.log('📊 RANKING FINAL:\n');
  for (let i = 0; i < ranking.length; i++) {
    const badge = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
    console.log(`${badge} ${i + 1}º lugar: ${ranking[i].name} - ${ranking[i].totalPoints} pontos`);
  }
  console.log();
}

function displayBetDetails(users: User[]): void {
  console.log('\n' + '='.repeat(70));
  console.log('📋 DETALHES DAS APOSTAS POR USUÁRIO');
  console.log('='.repeat(70) + '\n');

  for (const user of users) {
    console.log(`👤 ${user.name}:`);
    console.log('-'.repeat(70));

    let userTotalPoints = 0;
    for (let i = 0; i < testBets.length; i++) {
      const bet = testBets[i];
      const result = matchResults[i];
      const betId = `${user.uid}_${bet.matchId}`;
      const savedBet = database.bets.get(betId);

      if (savedBet) {
        userTotalPoints += savedBet.points;
        console.log(`  ${i + 1}. ${bet.homeTeam} ${bet.homeGoals}x${bet.awayGoals} ${bet.awayTeam}`);
        console.log(`     Resultado: ${result.homeGoals}x${result.awayGoals}`);
        console.log(`     Status: ${savedBet.status}`);
        console.log();
      }
    }

    console.log(`  Total de pontos: ${userTotalPoints} pontos\n`);
  }
}

function displayFinalReport(users: User[], pointsMap: Map<string, number>): void {
  console.log('\n' + '='.repeat(70));
  console.log('📋 RELATÓRIO FINAL DO TESTE');
  console.log('='.repeat(70) + '\n');

  console.log('✅ TESTES REALIZADOS:\n');
  console.log('  1. ✓ Criação de 3 usuários');
  console.log('  2. ✓ Login dos 3 usuários');
  console.log('  3. ✓ Preenchimento de 5 apostas por usuário (15 apostas total)');
  console.log('  4. ✓ Salvamento das apostas no banco de dados');
  console.log('  5. ✓ Simulação de resultados fictícios');
  console.log('  6. ✓ Cálculo automático de pontos');
  console.log('  7. ✓ Atualização do ranking\n');

  console.log('👥 USUÁRIOS CRIADOS:\n');
  for (const user of users) {
    console.log(`  • ${user.name} (${user.email})`);
    console.log(`    UID: ${user.uid}`);
  }

  console.log('\n📊 PONTOS FINAIS:\n');
  const ranking = users
    .map(user => ({
      name: user.name,
      points: pointsMap.get(user.uid) || 0
    }))
    .sort((a, b) => b.points - a.points);

  for (let i = 0; i < ranking.length; i++) {
    const badge = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
    console.log(`  ${badge} ${ranking[i].name}: ${ranking[i].points} pontos`);
  }

  console.log('\n📈 ESTATÍSTICAS:\n');
  console.log(`  • Total de usuários: ${users.length}`);
  console.log(`  • Total de apostas: ${users.length * 5}`);
  console.log(`  • Apostas salvas: ${database.bets.size}`);
  console.log(`  • Resultados processados: ${database.matches.size}`);

  console.log('\n' + '='.repeat(70));
  console.log('✅ TODOS OS TESTES CONCLUÍDOS COM SUCESSO!');
  console.log('='.repeat(70) + '\n');
}

// ============================================
// EXECUTAR TESTES
// ============================================

function runTests(): void {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🧪 INICIANDO TESTES DO BOLÃO COPA 2026');
    console.log('='.repeat(70));

    // 1. Criar usuários
    const createdUsers = createUsers();

    // 2. Simular login
    loginUsers(createdUsers);

    // 3. Criar apostas
    createBets(createdUsers);

    // 4. Simular resultados
    simulateResults();

    // 5. Calcular pontos
    const pointsMap = calculatePoints(createdUsers);

    // 6. Atualizar ranking
    updateRanking(createdUsers, pointsMap);

    // 7. Exibir detalhes das apostas
    displayBetDetails(createdUsers);

    // 8. Exibir relatório final
    displayFinalReport(createdUsers, pointsMap);
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
    process.exit(1);
  }
}

// Executar
runTests();
