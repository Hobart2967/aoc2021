import * as fs from 'fs';
import * as path from 'path';

(() => {
  const daysToRun = 256;

  const initialFishBirthTimers = (fs
    .readFileSync(path.join(__dirname, 'inputs'))
    .toString()
    .split('\n')[0])
    .split(',')
    .map(timerString => parseInt(timerString, 10));

  function createSchoolState() {
    return Array.from(new Array(9)).map(() => 0);
  }

  let school =
    initialFishBirthTimers
      .reduce((prev, cur) => {
        prev[cur]++;
        return prev;
      }, createSchoolState());

  console.log(school);
  function getSchoolSize(school: number[]) {
    return school
      .reduce((prev, cur) => prev += cur, 0);
  }

  let day = 1;
  console.log(`After ${(0).toString().padStart(3)} day(s) there are ${getSchoolSize(school)} fish.`);
  while (day <= daysToRun) {
    const newSchoolState = createSchoolState();
    const fishGivingBirth = school[0];
    for (let i = 7; i >= 0; i--) {
      newSchoolState[i] = school[i + 1];
    }

    school = newSchoolState;
    school[8] = fishGivingBirth;
    school[6] += fishGivingBirth;

    console.log(`After ${day.toString().padStart(3)} day(s) there are ${getSchoolSize(school)} fish.`);
    day++;
  }
})();

