//(() => {
    $('#multiCollapse1').on('show.bs.collapse', () => {
        $('#multiCollapse2').collapse('hide')
        $('#multiCollapse3').collapse('hide')
        $('#multiCollapse4').collapse('hide')
        document.getElementById('roleSwitch').innerHTML = 'Склад'
    })
    $('#multiCollapse2').on('show.bs.collapse', () => {
        $('#multiCollapse1').collapse('hide')
        $('#multiCollapse3').collapse('hide')
        $('#multiCollapse4').collapse('hide')
        document.getElementById('roleSwitch').innerHTML = 'Производитель'
    })
    $('#multiCollapse3').on('show.bs.collapse', () => {
        $('#multiCollapse2').collapse('hide')
        $('#multiCollapse1').collapse('hide')
        $('#multiCollapse4').collapse('hide')
        document.getElementById('roleSwitch').innerHTML = 'Транспортная компания'
    })
    $('#multiCollapse4').on('show.bs.collapse', () => {
        $('#multiCollapse2').collapse('hide')
        $('#multiCollapse3').collapse('hide')
        $('#multiCollapse1').collapse('hide')
        document.getElementById('roleSwitch').innerHTML = 'Потребитель'
    })
//})();