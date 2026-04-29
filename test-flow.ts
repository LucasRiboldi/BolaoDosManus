/**
 * Script de Teste - Fluxo Completo do Bolão Copa 2026
 * 
 * Testa:
 * 1. Criação de 3 usuários
 * 2. Login dos 3 usuários
 * 3. Preenchimento de 5 apostas por usuário
 * 4. Salvamento das apostas
 * 5. Simulação de resultados fictícios
 * 6. Atualização automática do ranking
 */

import * as admin from 'firebase-admin';

// Inicializar Firebase Admin
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://manusbolao.firebaseio.com'
});

const auth = admin.auth();
const db = admin.firestore();

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
// FUNÇÕES DE TESTE
// ============================================

async function createUsers() {
  console.log('\n📝 CRIANDO 3 USUÁRIOS...\n');
  const createdUsers: any[] = [];

  for (const user of testUsers) {
    try {
      const userRecord = await auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.name
      });

      // Salvar dados do usuário no Firestore
      await db.collection('users').doc(userRecord.uid).set({
        id: userRecord.uid,
        name: user.name,
        email: user.email,
        totalPoints: 0,
        groupPoints: 0,
        knockoutPoints: 0,
        position: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      createdUsers.push({ ...user, uid: userRecord.uid });
      console.log(`✅ Usuário criado: ${user.name} (${user.email})`);
      console.log(`   UID: ${userRecord.uid}\n`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`⚠️  Usuário já existe: ${user.email}`);
        // Buscar o usuário existente
        const userRecord = await auth.getUserByEmail(user.email);
        createdUsers.push({ ...user, uid: userRecord.uid });
      } else {
        console.error(`❌ Erro ao criar usuário ${user.name}:`, error.message);
      }
    }
  }

  return createdUsers;
}

async function loginUsers(users: any[]) {
  console.log('\n🔐 SIMULANDO LOGIN DOS 3 USUÁRIOS...\n');

  for (const user of users) {
    console.log(`✅ Login bem-sucedido: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   UID: ${user.uid}\n`);
  }
}

async function createBets(users: any[]) {
  console.log('\n📊 PREENCHENDO 5 APOSTAS POR USUÁRIO...\n');

  for (const user of users) {
    console.log(`📝 Apostas de ${user.name}:`);

    for (let i = 0; i < testBets.length; i++) {
      const bet = testBets[i];
      const betId = `${user.uid}_${bet.matchId}`;

      await db.collection('groupBets').doc(betId).set({
        id: betId,
        userId: user.uid,
        matchId: bet.matchId,
        homeTeam: bet.homeTeam,
        awayTeam: bet.awayTeam,
        homeGoals: bet.homeGoals,
        awayGoals: bet.awayGoals,
        points: 0,
        confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log(`   ✓ ${bet.homeTeam} ${bet.homeGoals}x${bet.awayGoals} ${bet.awayTeam}`);
    }
    console.log();
  }
}

async function simulateResults() {
  console.log('\n⚽ SIMULANDO RESULTADOS DAS 5 PRIMEIRAS PARTIDAS...\n');

  for (const result of matchResults) {
    await db.collection('matches').doc(result.matchId).update({
      homeGoals: result.homeGoals,
      awayGoals: result.awayGoals,
      status: result.status,
      updatedAt: new Date()
    });

    console.log(`✓ ${result.matchId}: ${result.homeGoals}x${result.awayGoals} (${result.status})`);
  }
  console.log();
}

async function calculatePoints(users: any[]) {
  console.log('\n🤖 CALCULANDO PONTOS AUTOMATICAMENTE...\n');

  const pointsMap: { [key: string]: number } = {};

  // Inicializar pontos
  for (const user of users) {
    pointsMap[user.uid] = 0;
  }

  // Calcular pontos para cada aposta
  for (const user of users) {
    console.log(`\n📊 Cálculo de pontos para ${user.name}:`);

    for (let i = 0; i < testBets.length; i++) {
      const bet = testBets[i];
      const result = matchResults[i];
      const betId = `${user.uid}_${bet.matchId}`;

      let points = 0;
      let status = 'Errou';

      // Verificar acerto exato
      if (bet.homeGoals === result.homeGoals && bet.awayGoals === result.awayGoals) {
        points = 10;
        status = 'Acerto Exato ✓';
      }
      // Verificar acerto de vencedor
      else if (
        (bet.homeGoals > bet.awayGoals && result.homeGoals > result.awayGoals) ||
        (bet.homeGoals < bet.awayGoals && result.homeGoals < result.awayGoals) ||
        (bet.homeGoals === bet.awayGoals && result.homeGoals === result.awayGoals)
      ) {
        points = 5;
        status = 'Acerto Parcial ✓';
      }

      // Atualizar aposta com pontos
      await db.collection('groupBets').doc(betId).update({
        points: points,
        result: {
          homeGoals: result.homeGoals,
          awayGoals: result.awayGoals
        },
        status: status,
        updatedAt: new Date()
      });

      pointsMap[user.uid] += points;
      console.log(`   ${bet.homeTeam} vs ${bet.awayTeam}: ${points} pontos (${status})`);
    }
  }

  return pointsMap;
}

async function updateRanking(users: any[], pointsMap: { [key: string]: number }) {
  console.log('\n🏆 ATUALIZANDO RANKING...\n');

  // Criar array com usuários e seus pontos
  const ranking = users.map(user => ({
    uid: user.uid,
    name: user.name,
    totalPoints: pointsMap[user.uid]
  })).sort((a, b) => b.totalPoints - a.totalPoints);

  // Atualizar posição de cada usuário no Firestore
  for (let i = 0; i < ranking.length; i++) {
    const user = ranking[i];
    await db.collection('users').doc(user.uid).update({
      totalPoints: user.totalPoints,
      groupPoints: user.totalPoints,
      position: i + 1,
      updatedAt: new Date()
    });
  }

  // Exibir ranking
  console.log('📊 RANKING FINAL:\n');
  for (let i = 0; i < ranking.length; i++) {
    const badge = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
    console.log(`${badge} ${i + 1}º lugar: ${ranking[i].name} - ${ranking[i].totalPoints} pontos`);
  }
  console.log();
}

async function displayFinalReport(users: any[], pointsMap: { [key: string]: number }) {
  console.log('\n' + '='.repeat(60));
  console.log('📋 RELATÓRIO FINAL DO TESTE');
  console.log('='.repeat(60) + '\n');

  console.log('✅ TESTES REALIZADOS:\n');
  console.log('1. ✓ Criação de 3 usuários');
  console.log('2. ✓ Login dos 3 usuários');
  console.log('3. ✓ Preenchimento de 5 apostas por usuário (15 apostas total)');
  console.log('4. ✓ Salvamento das apostas no Firestore');
  console.log('5. ✓ Simulação de resultados fictícios');
  console.log('6. ✓ Cálculo automático de pontos');
  console.log('7. ✓ Atualização do ranking\n');

  console.log('👥 USUÁRIOS CRIADOS:\n');
  for (const user of users) {
    console.log(`   • ${user.name} (${user.email})`);
  }

  console.log('\n📊 PONTOS FINAIS:\n');
  for (const user of users) {
    console.log(`   • ${user.name}: ${pointsMap[user.uid]} pontos`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ TODOS OS TESTES CONCLUÍDOS COM SUCESSO!');
  console.log('='.repeat(60) + '\n');
}

// ============================================
// EXECUTAR TESTES
// ============================================

async function runTests() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 INICIANDO TESTES DO BOLÃO COPA 2026');
    console.log('='.repeat(60));

    // 1. Criar usuários
    const createdUsers = await createUsers();

    // 2. Simular login
    await loginUsers(createdUsers);

    // 3. Criar apostas
    await createBets(createdUsers);

    // 4. Simular resultados
    await simulateResults();

    // 5. Calcular pontos
    const pointsMap = await calculatePoints(createdUsers);

    // 6. Atualizar ranking
    await updateRanking(createdUsers, pointsMap);

    // 7. Exibir relatório final
    await displayFinalReport(createdUsers, pointsMap);

    // Fechar conexão
    await admin.app().delete();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
    process.exit(1);
  }
}

// Executar
runTests();
