import fetch from "node-fetch";
const playerName = 'davidst@uia.no';

async function startChallenge() {
    const response = await fetch(`https://spacescavanger.onrender.com/start?player=${playerName}`);
    const data = await response.json();
    console.log('Challenge started:', data);
}

async function submitAnswer(answer) {
    const response = await fetch('https://spacescavanger.onrender.com/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answer: answer,
        player: playerName
      })
    });
  
    const data = await response.json();
    console.log(`Answer submitted: ${answer}`, data);
}

const answer1 = 834;
const answer2 = 'mars';
const answer3 = 'jupiter'
const answer4 = 95;
const answer5 = 'ganymede';
const answer6 = 'dwarf planet';

async function runChallenge() {
    await startChallenge();
    await submitAnswer(answer1);
    await submitAnswer(answer2);
    await submitAnswer(answer3);
    await submitAnswer(answer4);
    await submitAnswer(answer5);
    await submitAnswer(answer6);
}

runChallenge();