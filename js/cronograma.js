// Datos del cronograma extraídos del archivo Cronograma.txt
const cronogramaData = [
    {
        semana: 1,
        fechas: "05 Sep - 12 Sep 2025",
        fase: "Presentación de la POC",
        tarea: "Analizar el código base y definir el alcance de la POC.",
        entregable: "POC presentada y \"vendida\" a la Economista Jefe."
    },
    {
        semana: 2,
        fechas: "15 Sep - 19 Sep 2025",
        fase: "Desarrollo I",
        tarea: "Construir el prototipo de la ficha de conciliación y conectar a las fuentes de datos.",
        entregable: "Prototipo de ficha de conciliación y documentación de fase."
    },
    {
        semana: 3,
        fechas: "22 Sep - 26 Sep 2025",
        fase: "Desarrollo II",
        tarea: "Desarrollar el dashboard principal y las fichas de intervención y prevención.",
        entregable: "Avance de las fichas y del dashboard."
    },
    {
        semana: 4,
        fechas: "29 Sep - 03 Oct 2025",
        fase: "Pruebas I",
        tarea: "Realizar pruebas internas y ajustar el diseño.",
        entregable: "Informe de bugs y mejoras de diseño."
    },
    {
        semana: 5,
        fechas: "06 Oct - 10 Oct 2025",
        fase: "Pruebas II",
        tarea: "Realizar pruebas con usuarios finales (procuradores).",
        entregable: "Feedback de usuarios y entrega de prototipos para uso."
    },
    {
        semana: 6,
        fechas: "13 Oct - 17 Oct 2025",
        fase: "Consolidación",
        tarea: "Finalizar la documentación del proyecto y la integración con la ANDJE.",
        entregable: "Documentación técnica y plan de integración."
    },
    {
        semana: 7,
        fechas: "20 Oct - 24 Oct 2025",
        fase: "Almacenamiento",
        tarea: "Definir y estructurar la plataforma para el almacenamiento de datos.",
        entregable: "Esquema de base de datos."
    },
    {
        semana: 8,
        fechas: "27 Oct - 31 Oct 2025",
        fase: "Presentación final",
        tarea: "Preparar y presentar el proyecto consolidado a la dirección.",
        entregable: "Presentación y informe del proyecto."
    },
    {
        semana: 9,
        fechas: "03 Nov - 07 Nov 2025",
        fase: "Capacitación",
        tarea: "Capacitar a los procuradores en el uso de la herramienta.",
        entregable: "Plan de capacitación y materiales."
    },
    {
        semana: 10,
        fechas: "10 Nov - 14 Nov 2025",
        fase: "Validación",
        tarea: "Revisar y validar los entregables finales.",
        entregable: "Informe de validación."
    },
    {
        semana: 11,
        fechas: "17 Nov - 21 Nov 2025",
        fase: "Cierre I",
        tarea: "Completar trámites de vinculación y transferir conocimiento al equipo.",
        entregable: "Documentos administrativos y archivos."
    },
    {
        semana: 12,
        fechas: "24 Nov - 28 Nov 2025",
        fase: "Cierre II",
        tarea: "Finalizar el cierre formal del proyecto.",
        entregable: "Cierre oficial del proyecto el 30 de noviembre."
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