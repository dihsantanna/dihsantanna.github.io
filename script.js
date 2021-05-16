const softSkillsList = document.querySelector('.my-soft-skills');
const hardSkillsList = document.querySelector('.my-hard-skills')
// Coloca uma soft skill para cada constante
const softSkill1 = 'Disposição para aprender coisas novas';
const softSkill2 = 'Bom em lidar com desafios;';
const softSkill3 = 'Comunicativo;';
const softSkill4 = 'Gosto de trabalhar em equipe';
const softSkill5 = 'Comprometimento com as responsabilidades;';
const softSkill6 = 'Tratar a todos com Empatia.';
// Array contendo todas as soft skills
const softSkills = [softSkill1 , softSkill2 , softSkill3 , softSkill4 , softSkill5, softSkill6];
// Coloca uma hard skill para cada constante
const hardSkill1 = 'Unix;';
const hardSkill2 = 'Git;';
const hardSkill3 = 'GitHub;';
const hardSkill4 = 'HTML;';
const hardSkill5 = 'CSS;';
const hardSkill6 = 'Semantic HTML;';
const hardSkill7 = 'JavaScript;';
const hardSkill8 = 'DOM;';
const hardSkill9 = 'Forms.';
// Array contendo todas as hard skills
const hardSkills = [hardSkill1 , hardSkill2 , hardSkill3 , hardSkill4 , hardSkill5, hardSkill6 , hardSkill7 , hardSkill8, hardSkill9];
// Função que gera listas de soft skills dinâmicamente
function createSkillsList(arrSkills, element) {
    for (let index = 0; index < arrSkills.length; index += 1) {
        const skill = arrSkills[index];
        const itemTag = document.createElement('li');
        itemTag.innerHTML = skill;
        element.appendChild(itemTag);
    }
}
window.onload = () => {
    createSkillsList(softSkills, softSkillsList);
    createSkillsList(hardSkills, hardSkillsList);
};