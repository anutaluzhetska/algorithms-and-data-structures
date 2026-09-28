const groupNames = ["ЕК-21 (Економісти)", "ЮР-31 (Юристи)", "ФІЛ-11 (Філологи)"];
const dayNames = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];

const universitySchedule = [
  // Група 0: ЕК-21
  [
    ["Вища математика", "Економічна теорія", "Вільне вікно", "Філософія"], 
    ["Історія України", "Вільне вікно", "Вільне вікно", "Вільне вікно"],    
    ["Іноземна мова", "Правознавство", "Економічна теорія", "Соціологія"], 
    ["Вільне вікно", "Вільне вікно", "Вільне вікно", "Вільне вікно"],       
    ["Політологія", "Вільне вікно", "Вища математика", "Вільне вікно"]      
  ],
  // Група 1: ЮР-31
  [
    ["Історія України", "Правознавство", "Вільне вікно", "Філософія"],      
    ["Іноземна мова", "Соціологія", "Правознавство", "Вільне вікно"],       
    ["Філософія", "Правознавство", "Іноземна мова", "Соціологія"],          
    ["Вільне вікно", "Вільне вікно", "Історія України", "Вільне вікно"],    
    ["Політологія", "Правознавство", "Вільне вікно", "Вільне вікно"]        
  ],
  // Група 2: ФІЛ-11
  [
    ["Іноземна мова", "Іноземна мова", "Історія України", "Філософія"],     
    ["Історія України", "Вільне вікно", "Вільне вікно", "Вільне вікно"],    
    ["Філософія", "Іноземна мова", "Історія України", "Соціологія"],        
    ["Іноземна мова", "Вільне вікно", "Іноземна мова", "Вільне вікно"],     
    ["Вільне вікно", "Вільне вікно", "Вільне вікно", "Вільне вікно"]        
  ]
];

//Знайти день із найбільшим навантаженням для обраної групи
function findBusiestDay(schedule, groupIndex) {
  const groupSchedule = schedule[groupIndex];
  let maxClasses = 0;
  let busiestDaysIndexes = [];

  groupSchedule.forEach((daySlots, dayIndex) => {
    const classesCount = daySlots.filter(subject => subject !== "Вільне вікно").length;
    
    if (classesCount > maxClasses) {
      maxClasses = classesCount;
      busiestDaysIndexes = [dayIndex];
    } else if (classesCount === maxClasses && classesCount > 0) {
      busiestDaysIndexes.push(dayIndex);
    }
  });

  return { days: busiestDaysIndexes, count: maxClasses };
}

//Знайти день із незручним розкладом (де є «вікна»)
function findInconvenientDays(schedule, groupIndex) {
  const groupSchedule = schedule[groupIndex];
  const inconvenientDaysIndexes = [];

  groupSchedule.forEach((daySlots, dayIndex) => {
    let firstClassIndex = -1;
    let lastClassIndex = -1;

    daySlots.forEach((subject, slotIndex) => {
      if (subject !== "Вільне вікно") {
        if (firstClassIndex === -1) firstClassIndex = slotIndex;
        lastClassIndex = slotIndex;
      }
    });

    if (firstClassIndex !== -1 && lastClassIndex !== -1) {
      for (let i = firstClassIndex + 1; i < lastClassIndex; i++) {
        if (daySlots[i] === "Вільне вікно") {
          inconvenientDaysIndexes.push(dayIndex);
          break; 
        }
      }
    }
  });

  return inconvenientDaysIndexes;
}

//Перевірити, чи є в розкладі заняття для "потоку"
function findFlowClasses(schedule, groupNamesArr) {
  const flowClasses = [];
  const daysCount = schedule[0].length;
  const slotsCount = schedule[0][0].length;

  for (let dayIndex = 0; dayIndex < daysCount; dayIndex++) {
    for (let slotIndex = 0; slotIndex < slotsCount; slotIndex++) {
      const subjectMap = {};

      for (let groupIndex = 0; groupIndex < schedule.length; groupIndex++) {
        const subject = schedule[groupIndex][dayIndex][slotIndex];
        if (subject !== "Вільне вікно") {
          if (!subjectMap[subject]) subjectMap[subject] = [];
          subjectMap[subject].push(groupNamesArr[groupIndex]);
        }
      }

      for (const [subject, groupsInfo] of Object.entries(subjectMap)) {
        if (groupsInfo.length > 1) {
          flowClasses.push({
            dayIndex: dayIndex,
            slotNumber: slotIndex + 1,
            subject: subject,
            groups: groupsInfo
          });
        }
      }
    }
  }

  return flowClasses;
}

// --- ВИКОНАННЯ ТА ВИВІД РЕЗУЛЬТАТІВ ---

console.log("=== Аналіз розкладу ===");

// Аналізуємо для конкретної групи (наприклад, ЕК-21 - індекс 0)
const selectedGroupIndex = 0; 
console.log(`\nАналіз для групи: ${groupNames[selectedGroupIndex]}`);

// Знаходимо найзавантаженіший день
const busiestInfo = findBusiestDay(universitySchedule, selectedGroupIndex);
const busyDayNames = busiestInfo.days.map(index => dayNames[index]).join(", ");
console.log(`Найбільше навантаження: ${busyDayNames} (${busiestInfo.count} пари)`);

// Знаходимо дні з вікнами
const inconvenientDays = findInconvenientDays(universitySchedule, selectedGroupIndex);
if (inconvenientDays.length > 0) {
  const badDayNames = inconvenientDays.map(index => dayNames[index]).join(", ");
  console.log(`Незручний розклад (є "вікна"): ${badDayNames}`);
} else {
  console.log('Вікон у розкладі немає. Розклад зручний!');
}

// Шукаємо потокові заняття
console.log("\nПотокові заняття (кілька груп одночасно):");
const flows = findFlowClasses(universitySchedule, groupNames);
if (flows.length > 0) {
  flows.forEach(flow => {
    console.log(`- ${dayNames[flow.dayIndex]}, ${flow.slotNumber} пара: ${flow.subject}. Групи: ${flow.groups.join(", ")}`);
  });
} else {
  console.log("Потокових занять не знайдено.");
}