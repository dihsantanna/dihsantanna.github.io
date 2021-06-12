const softSkillsList = document.querySelector('.my-soft-skills');
const hardSkillsList = document.querySelector('.my-hard-skills')

const softSkills = [
    'Disposição para aprender coisas novas',
    'Bom em lidar com desafios;',
    'Comunicativo;',
    'Gosto de trabalhar em equipe',
    'Comprometimento com as responsabilidades;',
    'Tratar a todos com Empatia.'
].sort();

const hardSkills = [
    'Unix;',
    'Git;',
    'HTML;',
    'CSS;',
    'JavaScript;',
    'DOM;',
    'Forms;',
    'Unit Tests;',
    'HOF.'
].sort();

function createElement(elementName, innerHTML, className) {
  const itemTag = document.createElement(elementName);
  if (className) itemTag.className = className;
  if (innerHTML) itemTag.innerHTML = innerHTML;
  return itemTag;
}

function createSkillsList(arrSkills, element) {
    arrSkills.forEach((skill) => {
      const elementSkill = createElement('li', skill, 'skill');
      element.appendChild(elementSkill);
    })
}
window.onload = () => {
    createSkillsList(softSkills, softSkillsList);
    createSkillsList(hardSkills, hardSkillsList);
};