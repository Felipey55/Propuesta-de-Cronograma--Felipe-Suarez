// Datos del cronograma extraídos del archivo Cronograma.txt
const cronogramaData = [
    {
        semana: 1,
        fechas: "05 Sep - 12 Sep 2025",
        fase: "Presentación de la POC",
        tarea: "Revisar el código base y la documentación. Analizar las fuentes de datos (eKOGUI, SIFN, SIM). Conceptualizar el flujo de trabajo del prototipo para la presentación.",
        entregable: "Prueba de Concepto (POC) presentada a la Economista Jefe y el equipo."
    },
    {
        semana: 2,
        fechas: "15 Sep - 19 Sep 2025",
        fase: "Desarrollo I",
        tarea: "Construir la primera versión del prototipo de la ficha de conciliación. Establecer la conexión inicial con las fuentes de datos. Mapear las variables clave para la visualización de los datos históricos.",
        entregable: "Prototipo funcional de la Ficha de Conciliación."
    },
    {
        semana: 3,
        fechas: "22 Sep - 26 Sep 2025",
        fase: "Desarrollo II",
        tarea: "Desarrollar el dashboard principal para visualizar el comportamiento de la litigiosidad. Iniciar la construcción de las fichas de intervención y prevención, basándose en la información histórica de los procesos judiciales.",
        entregable: "Avance del dashboard y de las fichas de intervención y prevención."
    },
    {
        semana: 4,
        fechas: "29 Sep - 03 Oct 2025",
        fase: "Pruebas I",
        tarea: "Realizar pruebas internas del prototipo. Ajustar el diseño gráfico de las fichas y el dashboard.",
        entregable: "Prototipos funcionales con ajustes iniciales y un informe de bugs."
    },
    {
        semana: 5,
        fechas: "06 Oct - 10 Oct 2025",
        fase: "Pruebas II",
        tarea: "Planificar y ejecutar pruebas de usabilidad con un grupo focal de procuradores. Recopilar la retroalimentación de los usuarios finales sobre el prototipo.",
        entregable: "Entrega de los prototipos para uso por parte de los procuradores."
    },
    {
        semana: 6,
        fechas: "13 Oct - 17 Oct 2025",
        fase: "Consolidación",
        tarea: "Documentar los hallazgos de las pruebas. Finalizar la documentación técnica del proyecto. Integrar los datos de la Agencia Nacional de Defensa Jurídica del Estado (ANDJE).",
        entregable: "Documentación técnica completa y plan de integración de datos."
    },
    {
        semana: 7,
        fechas: "20 Oct - 24 Oct 2025",
        fase: "Almacenamiento",
        tarea: "Definir la estructura de la base de datos para almacenar la información. Configurar la plataforma de almacenamiento para los datos.",
        entregable: "Plataforma de almacenamiento estructurada y operativa."
    },
    {
        semana: 8,
        fechas: "27 Oct - 31 Oct 2025",
        fase: "Presentación final",
        tarea: "Preparar los materiales para la presentación final del proyecto. Realizar la presentación a la dirección.",
        entregable: "Presentación final del producto e informe del proyecto."
    },
    {
        semana: 9,
        fechas: "03 Nov - 07 Nov 2025",
        fase: "Capacitación",
        tarea: "Diseñar el plan de capacitación para los procuradores. Crear los materiales de entrenamiento y realizar la primera sesión de capacitación.",
        entregable: "Plan de capacitación y materiales de formación."
    },
    {
        semana: 10,
        fechas: "10 Nov - 14 Nov 2025",
        fase: "Validación",
        tarea: "Revisar los entregables finales con el equipo. Corregir cualquier falla o bug de último momento.",
        entregable: "Informe de validación y correcciones aplicadas."
    },
    {
        semana: 11,
        fechas: "17 Nov - 21 Nov 2025",
        fase: "Cierre I",
        tarea: "Completar los trámites de vinculación y la documentación administrativa. Transferir todo el conocimiento, el código y los documentos al equipo para futuras fases.",
        entregable: "Documentos administrativos y archivos del proyecto."
    },
    {
        semana: 12,
        fechas: "24 Nov - 28 Nov 2025",
        fase: "Cierre II",
        tarea: "Realizar el cierre formal del proyecto. Entregar los documentos finales para su archivo.",
        entregable: "Cierre oficial del proyecto el 30 de noviembre de 2025."
    }
];

// Variables globales
let currentView = 'timeline';
let filteredData = cronogramaData;

// Función para obtener el estado de una semana (completada, actual, futura)
function getWeekStatus(semana) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Para efectos de demostración, consideramos que estamos en 2025
    // y que las primeras 3 semanas están completadas, la 4ta es actual
    if (semana <= 3) {
        return 'completed';
    } else if (semana === 4) {
        return 'current';
    } else {
        return 'future';
    }
}



// Función para renderizar la vista de timeline
function renderTimeline() {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '';
    
    filteredData.forEach(item => {
        const status = getWeekStatus(item.semana);
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${status}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content ${status}">
                <div class="timeline-week">Semana ${item.semana}</div>
                <div class="timeline-dates">${item.fechas}</div>
                <div class="timeline-phase">${item.fase}</div>
                <div class="timeline-task">${item.tarea}</div>
                <div class="timeline-deliverable"><strong>Entregable:</strong> ${item.entregable}</div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Función para renderizar la vista de tabla
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    filteredData.forEach(item => {
        const status = getWeekStatus(item.semana);
        const row = document.createElement('tr');
        row.className = status;
        
        row.innerHTML = `
            <td>${item.semana}</td>
            <td>${item.fechas}</td>
            <td>${item.fase}</td>
            <td>${item.tarea}</td>
            <td>${item.entregable}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Función para cambiar entre vistas
function toggleView() {
    const timelineView = document.getElementById('timelineView');
    const tableView = document.getElementById('tableView');
    const toggleBtn = document.getElementById('toggleView');
    
    if (currentView === 'timeline') {
        timelineView.style.display = 'none';
        tableView.style.display = 'block';
        toggleBtn.textContent = 'Vista de Timeline';
        currentView = 'table';
        renderTable();
    } else {
        timelineView.style.display = 'block';
        tableView.style.display = 'none';
        toggleBtn.textContent = 'Vista de Tabla';
        currentView = 'timeline';
        renderTimeline();
    }
}

// Función para obtener fases únicas
function getUniqueFases() {
    const fases = cronogramaData.map(item => item.fase);
    return [...new Set(fases)];
}

// Función para poblar el filtro de fases
function populatePhaseFilter() {
    const phaseFilter = document.getElementById('phaseFilter');
    const uniqueFases = getUniqueFases();
    
    // Limpiar opciones existentes excepto "Todas las fases"
    phaseFilter.innerHTML = '<option value="all">Todas las fases</option>';
    
    uniqueFases.forEach(fase => {
        const option = document.createElement('option');
        option.value = fase;
        option.textContent = fase;
        phaseFilter.appendChild(option);
    });
}

// Función para filtrar por fase
function filterByPhase(selectedPhase) {
    if (selectedPhase === 'all') {
        filteredData = cronogramaData;
    } else {
        filteredData = cronogramaData.filter(item => item.fase === selectedPhase);
    }
    
    // Re-renderizar la vista actual
    if (currentView === 'timeline') {
        renderTimeline();
    } else {
        renderTable();
    }
}

// Función para mostrar/ocultar el filtro de fases
function togglePhaseFilter() {
    const phaseFilter = document.getElementById('phaseFilter');
    const filterBtn = document.getElementById('filterBtn');
    
    if (phaseFilter.style.display === 'none' || phaseFilter.style.display === '') {
        phaseFilter.style.display = 'block';
        filterBtn.textContent = 'Ocultar Filtro';
    } else {
        phaseFilter.style.display = 'none';
        filterBtn.textContent = 'Filtrar por Fase';
        // Resetear filtro
        phaseFilter.value = 'all';
        filterByPhase('all');
    }
}

// Función para añadir animaciones de entrada
function addEntranceAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Función de inicialización
function init() {
    // Renderizar vista inicial (timeline)
    renderTimeline();
    
    // Poblar filtro de fases
    populatePhaseFilter();
    
    // Añadir animaciones
    setTimeout(addEntranceAnimations, 100);
    
    // Event listeners
    document.getElementById('toggleView').addEventListener('click', toggleView);
    document.getElementById('filterBtn').addEventListener('click', togglePhaseFilter);
    document.getElementById('phaseFilter').addEventListener('change', (e) => {
        filterByPhase(e.target.value);
    });
    
    // Añadir efecto de hover a las tarjetas del timeline
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.timeline-content')) {
            e.target.closest('.timeline-content').style.transform = 'translateY(-5px)';
            e.target.closest('.timeline-content').style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.timeline-content')) {
            e.target.closest('.timeline-content').style.transform = 'translateY(0)';
            e.target.closest('.timeline-content').style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Función para exportar datos (funcionalidad adicional)
function exportToPDF() {
    // Esta función podría implementarse con una librería como jsPDF
    alert('Funcionalidad de exportación a PDF - Por implementar');
}

// Función para imprimir cronograma
function printCronograma() {
    window.print();
}

// Añadir estilos para impresión
const printStyles = `
    @media print {
        body {
            background: white !important;
        }
        
        .controls {
            display: none !important;
        }
        
        .timeline-container,
        .table-container {
            background: white !important;
            box-shadow: none !important;
        }
        
        .timeline::before {
            background: #333 !important;
        }
        
        .timeline-item::before {
            background: #333 !important;
            box-shadow: 0 0 0 3px #333 !important;
        }
    }
`;

// Añadir estilos de impresión al head
const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);