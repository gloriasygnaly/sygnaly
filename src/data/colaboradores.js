export const colaboradores = [
  {
    id: '1',
    nombre: 'Jorge Ramírez',
    iniciales: 'JR',
    cargo: 'Operario de producción',
    area: 'Planta Norte',
    planta: 'Planta Norte',
    turno: 'Turno A',
    turnoHorario: '06:00 – 14:00',
    antiguedad: '4 años 3 meses',
    sindicato: 'No sindicalizado',
    avatarColor: '#185FA5',
    nivelAlerta: 'atencion_urgente', // 'sin_senales' | 'observacion' | 'requiere_atencion' | 'atencion_urgente'
    tendencia: 'up',                // 'up' | 'down' | 'neutral'
    factoresPrincipales: ['Comportamiento', 'Conducta grave', 'Desempeño', 'Hecho legal'],
    estadoAlarma: 'Activo',

    senales: [
      {
        id: 'comportamiento_laboral',
        titulo: 'Comportamiento laboral',
        items: [
          { texto: 'Ausentismo recurrente: 3 episodios en 60 días', nivel: 'activa', fecha: 'Mar–Abr 2026' },
          { texto: 'Retrasos reiterados en línea de producción (8 en el mes)', nivel: 'activa', fecha: 'Abril 2026' },
          { texto: 'Incumplimiento de procedimiento de seguridad documentado', nivel: 'activa', fecha: '28 Mar 2026' },
        ],
      },
      {
        id: 'relacionamiento_interno',
        titulo: 'Relacionamiento interno',
        items: [
          { texto: 'Conflicto no resuelto con supervisor directo (Sr. I. Fuentes)', nivel: 'activa', fecha: 'Hace 12 días' },
          { texto: 'Quejas verbales de 2 compañeros de turno', nivel: 'observacion', fecha: 'Hace 30 días' },
        ],
      },
      {
        id: 'conductas_graves',
        titulo: 'Conductas graves',
        items: [
          { texto: 'Lenguaje intimidatorio en piso de planta (testigos presentes)', nivel: 'activa', fecha: '03 Abr 2026' },
        ],
      },
      {
        id: 'contexto_desempeno',
        titulo: 'Contexto y desempeño',
        items: [
          { texto: 'Caída de productividad: −22% vs. promedio del turno', nivel: 'activa', fecha: 'Mar–Abr 2026' },
          { texto: 'Evaluación de desempeño Q1 2026: 2.1/5 (bajo mínimo esperado)', nivel: 'activa', fecha: 'Abr 2026' },
          { texto: 'Capacitación Ley Karin pendiente de completar', nivel: 'observacion', fecha: 'Vence 30 Abr' },
        ],
      },
      {
        id: 'contexto_organizacional',
        titulo: 'Contexto organizacional',
        items: [
          { texto: 'Reestructuración de Turno A anunciada para Q3 2026', nivel: 'observacion', fecha: 'Mar 2026' },
          { texto: 'Clima laboral Planta Norte deteriorado (encuesta Feb. 2026)', nivel: 'observacion', fecha: 'Feb 2026' },
        ],
      },
      {
        id: 'eventos_legales',
        titulo: 'Eventos con consecuencias legales',
        items: [
          { texto: 'Denuncia anónima registrada en buzón de sugerencias', nivel: 'activa', fecha: '02 Abr 2026' },
          { texto: 'Accidente menor no reportado a tiempo (Ley 16.744)', nivel: 'activa', fecha: '18 Mar 2026' },
        ],
      },
    ],

    acciones: [
      {
        id: 1,
        titulo: 'Conversación de vinculación con RRHH',
        descripcion: 'Entrevista individual para identificar factores de tensión y necesidades del colaborador.',
        responsable: 'Carolina Muñoz',
        fecha: 'Iniciada 07 Abr 2026',
        estado: 'en_proceso',
      },
      {
        id: 2,
        titulo: 'Reunión de mediación con supervisor',
        descripcion: 'Sesión facilitada por RRHH entre Jorge Ramírez y el supervisor Sr. Ignacio Fuentes.',
        responsable: 'Pedro Soto',
        fecha: '12 Abr 2026',
        estado: 'agendada',
      },
      {
        id: 3,
        titulo: 'Derivación a programa de bienestar (EAP)',
        descripcion: 'Referir al colaborador al programa de apoyo psicológico externo.',
        responsable: 'Ana Torres',
        fecha: 'Por confirmar',
        estado: 'pendiente',
      },
      {
        id: 4,
        titulo: 'Revisión de carga de trabajo en línea de producción',
        descripcion: 'Evaluar distribución de tareas en Turno A junto al jefe de planta.',
        responsable: 'Luis Vera',
        fecha: '15 Abr 2026',
        estado: 'agendada',
      },
      {
        id: 5,
        titulo: 'Completar capacitación Ley Karin',
        descripcion: 'Inscribir y confirmar asistencia al módulo pendiente antes del vencimiento.',
        responsable: 'Jorge Ramírez',
        fecha: 'Antes del 30 Abr',
        estado: 'por_iniciar',
      },
    ],

    protocolo: {
      checklist: [
        { id: 'c1', texto: 'Contrato de trabajo original firmado', estado: 'al_dia' },
        { id: 'c2', texto: 'Últimas 3 liquidaciones de sueldo', estado: 'al_dia' },
        { id: 'c3', texto: 'Libro de asistencia (últimos 90 días)', estado: 'revisar' },
        { id: 'c4', texto: 'Amonestaciones escritas emitidas', estado: 'faltante' },
        { id: 'c5', texto: 'Evaluaciones de desempeño firmadas', estado: 'al_dia' },
        { id: 'c6', texto: 'Registro de capacitaciones obligatorias', estado: 'revisar' },
        { id: 'c7', texto: 'ODI vigente y firmado por el trabajador', estado: 'al_dia' },
        { id: 'c8', texto: 'Afiliación AFP / Isapre al día', estado: 'al_dia' },
        { id: 'c9', texto: 'Reglamento interno firmado y entregado', estado: 'al_dia' },
        { id: 'c10', texto: 'Registro de entrega y estado de EPP', estado: 'faltante' },
        { id: 'c11', texto: 'Cobertura seguro Ley 16.744 vigente', estado: 'al_dia' },
        { id: 'c12', texto: 'Denuncia interna registrada formalmente', estado: 'no_aplica' },
      ],
      exposicionDT: {
        nivel: 'Medio',
        items: [
          {
            concepto: 'Multa por infracción art. 506 Código del Trabajo',
            monto: '1–60 UTM',
            montoRef: '$65.630 – $3.937.800 aprox.',
          },
          {
            concepto: 'Sanción por incumplimiento Ley 16.744 (accidente no reportado)',
            monto: '10–150 UTM',
            montoRef: '$656.300 – $9.844.500 aprox.',
          },
          {
            concepto: 'Fiscalización por denuncia anónima (tutela ante Inspección)',
            monto: 'Sin monto',
            montoRef: 'Genera inspección in situ',
          },
        ],
      },
      exposicionTribunal: {
        nivel: 'Alto',
        items: [
          {
            concepto: 'Despido injustificado (art. 168 CdT)',
            monto: '~$3.380.000',
            detalle: '4 años × $650.000 + recargo 30%',
          },
          {
            concepto: 'Despido indirecto art. 171 CdT',
            monto: '~$4.680.000',
            detalle: '4 años × $650.000 + recargo 80%',
          },
          {
            concepto: 'Tutela laboral (art. 489 CdT)',
            monto: 'Hasta ~$7.150.000',
            detalle: 'Hasta 11 meses de remuneración',
          },
          {
            concepto: 'Cobro de prestaciones (feriados, horas extra)',
            monto: 'Variable',
            detalle: 'Depende de registros de asistencia',
          },
          {
            concepto: 'Nulidad del despido',
            monto: '~$650.000/mes',
            detalle: 'Remuneraciones devengadas mientras dure el juicio',
          },
        ],
      },
    },
  },

  /* ── 2. Fernanda Castillo ── */
  {
    id: '2',
    nombre: 'Fernanda Castillo',
    iniciales: 'FC',
    cargo: 'Administrativo',
    area: 'Administración',
    planta: 'Administración',
    turno: 'Turno Día',
    turnoHorario: '08:00 – 17:00',
    antiguedad: '2 años 8 meses',
    sindicato: 'No sindicalizada',
    avatarColor: '#E24B4A',
    nivelAlerta: 'atencion_urgente',
    tendencia: 'up',
    factoresPrincipales: ['Relacionamiento', 'Desempeño', 'Contexto org.'],
    estadoAlarma: 'Activo',
    senales: [
      { id: 'comportamiento_laboral', titulo: 'Comportamiento laboral', items: [
        { texto: 'Ausentismo: 2 episodios en 45 días', nivel: 'observacion', fecha: 'Mar–Abr 2026' },
      ]},
      { id: 'relacionamiento_interno', titulo: 'Relacionamiento interno', items: [
        { texto: 'Conflicto documentado con jefa directa', nivel: 'activa', fecha: '01 Abr 2026' },
        { texto: 'Aislamiento social en equipo administrativo', nivel: 'activa', fecha: 'Abr 2026' },
      ]},
      { id: 'conductas_graves', titulo: 'Conductas graves', items: [
        { texto: 'Incidente verbal en reunión de equipo (testigos)', nivel: 'activa', fecha: '05 Abr 2026' },
      ]},
      { id: 'contexto_desempeno', titulo: 'Contexto y desempeño', items: [
        { texto: 'Errores reiterados en reportes financieros', nivel: 'activa', fecha: 'Mar 2026' },
        { texto: 'Evaluación Q1 2026: 2.4/5', nivel: 'activa', fecha: 'Abr 2026' },
        { texto: 'Plazos incumplidos en 3 tareas consecutivas', nivel: 'activa', fecha: 'Abr 2026' },
      ]},
      { id: 'contexto_organizacional', titulo: 'Contexto organizacional', items: [
        { texto: 'Cambio de jefatura directa (tercer cambio en 12 meses)', nivel: 'observacion', fecha: 'Mar 2026' },
      ]},
      { id: 'eventos_legales', titulo: 'Eventos con consecuencias legales', items: [] },
    ],
    acciones: [
      { id: 1, titulo: 'Entrevista de vinculación con RRHH', descripcion: 'Escucha activa para identificar factores de malestar.', responsable: 'Carolina Muñoz', fecha: '10 Abr 2026', estado: 'agendada' },
      { id: 2, titulo: 'Mediación con jefatura directa', descripcion: 'Sesión facilitada para restablecer comunicación.', responsable: 'Pedro Soto', fecha: 'Por definir', estado: 'pendiente' },
    ],
    protocolo: null,
  },

  /* ── 3. Patricio Vega ── */
  {
    id: '3',
    nombre: 'Patricio Vega',
    iniciales: 'PV',
    cargo: 'Operario de producción',
    area: 'Planta Norte',
    planta: 'Planta Norte',
    turno: 'Turno B',
    turnoHorario: '14:00 – 22:00',
    antiguedad: '1 año 5 meses',
    sindicato: 'No sindicalizado',
    avatarColor: '#1D9E75',
    nivelAlerta: 'requiere_atencion',
    tendencia: 'up',
    factoresPrincipales: ['Comportamiento', 'Relacionamiento'],
    estadoAlarma: 'En seguimiento',
    senales: [
      { id: 'comportamiento_laboral', titulo: 'Comportamiento laboral', items: [
        { texto: 'Llegadas tarde: 5 episodios en el mes', nivel: 'activa', fecha: 'Abr 2026' },
        { texto: 'Incumplimiento de EPP en línea de producción', nivel: 'activa', fecha: '07 Abr 2026' },
      ]},
      { id: 'relacionamiento_interno', titulo: 'Relacionamiento interno', items: [
        { texto: 'Desacuerdo frecuente con supervisor de turno', nivel: 'activa', fecha: 'Mar–Abr 2026' },
      ]},
      { id: 'conductas_graves', titulo: 'Conductas graves', items: [] },
      { id: 'contexto_desempeno', titulo: 'Contexto y desempeño', items: [
        { texto: 'Productividad bajo promedio del turno (−12%)', nivel: 'activa', fecha: 'Abr 2026' },
      ]},
      { id: 'contexto_organizacional', titulo: 'Contexto organizacional', items: [
        { texto: 'Primer año completo en empresa, sin mentoría asignada', nivel: 'observacion', fecha: 'Permanente' },
      ]},
      { id: 'eventos_legales', titulo: 'Eventos con consecuencias legales', items: [] },
    ],
    acciones: [
      { id: 1, titulo: 'Conversación de feedback con supervisor', descripcion: 'Aclarar expectativas de puntualidad y uso de EPP.', responsable: 'Luis Vera', fecha: '11 Abr 2026', estado: 'agendada' },
    ],
    protocolo: null,
  },

  /* ── 4. Mónica Torres ── */
  {
    id: '4',
    nombre: 'Mónica Torres',
    iniciales: 'MT',
    cargo: 'Administrativo',
    area: 'Administración',
    planta: 'Administración',
    turno: 'Turno Día',
    turnoHorario: '08:00 – 17:00',
    antiguedad: '6 años 1 mes',
    sindicato: 'No sindicalizada',
    avatarColor: '#EF9F27',
    nivelAlerta: 'requiere_atencion',
    tendencia: 'neutral',
    factoresPrincipales: ['Desempeño', 'Contexto org.'],
    estadoAlarma: 'En seguimiento',
    senales: [
      { id: 'comportamiento_laboral', titulo: 'Comportamiento laboral', items: [
        { texto: 'Permiso médico recurrente (Licencias: 3 en 6 meses)', nivel: 'observacion', fecha: '2026' },
      ]},
      { id: 'relacionamiento_interno', titulo: 'Relacionamiento interno', items: [
        { texto: 'Dificultades de integración con equipo nuevo', nivel: 'activa', fecha: 'Mar 2026' },
      ]},
      { id: 'conductas_graves', titulo: 'Conductas graves', items: [] },
      { id: 'contexto_desempeno', titulo: 'Contexto y desempeño', items: [
        { texto: 'Reducción de alcance de rol sin comunicación formal', nivel: 'activa', fecha: 'Feb 2026' },
        { texto: 'Objetivos Q1 no alcanzados (60% cumplimiento)', nivel: 'activa', fecha: 'Abr 2026' },
      ]},
      { id: 'contexto_organizacional', titulo: 'Contexto organizacional', items: [
        { texto: 'Cambio de área sin proceso formal de inducción', nivel: 'observacion', fecha: 'Ene 2026' },
      ]},
      { id: 'eventos_legales', titulo: 'Eventos con consecuencias legales', items: [] },
    ],
    acciones: [
      { id: 1, titulo: 'Reunión de clarificación de rol con gerencia', descripcion: 'Definir formalmente funciones y objetivos actualizados.', responsable: 'Carolina Muñoz', fecha: '14 Abr 2026', estado: 'agendada' },
      { id: 2, titulo: 'Revisión de carga de trabajo', descripcion: 'Evaluar distribución de tareas en el equipo.', responsable: 'Ana Torres', fecha: 'Por definir', estado: 'por_iniciar' },
    ],
    protocolo: null,
  },

  /* ── 5. Héctor Muñoz ── */
  {
    id: '5',
    nombre: 'Héctor Muñoz',
    iniciales: 'HM',
    cargo: 'Supervisor de obras',
    area: 'Obras',
    planta: 'Obras',
    turno: 'Turno Día',
    turnoHorario: '07:00 – 16:00',
    antiguedad: '9 años 4 meses',
    sindicato: 'Sindicato N°1',
    avatarColor: '#534AB7',
    nivelAlerta: 'observacion',
    tendencia: 'up',
    factoresPrincipales: ['Relacionamiento'],
    estadoAlarma: 'Nuevo',
    senales: [
      { id: 'comportamiento_laboral', titulo: 'Comportamiento laboral', items: [] },
      { id: 'relacionamiento_interno', titulo: 'Relacionamiento interno', items: [
        { texto: 'Quejas informales de operarios a su cargo (x2)', nivel: 'activa', fecha: 'Mar 2026' },
        { texto: 'Comunicación vertical percibida como autoritaria', nivel: 'activa', fecha: 'Abr 2026' },
      ]},
      { id: 'conductas_graves', titulo: 'Conductas graves', items: [] },
      { id: 'contexto_desempeno', titulo: 'Contexto y desempeño', items: [
        { texto: 'Equipo a cargo registra mayor rotación que otras obras', nivel: 'observacion', fecha: '2026' },
      ]},
      { id: 'contexto_organizacional', titulo: 'Contexto organizacional', items: [] },
      { id: 'eventos_legales', titulo: 'Eventos con consecuencias legales', items: [] },
    ],
    acciones: [
      { id: 1, titulo: 'Capacitación en liderazgo y comunicación efectiva', descripcion: 'Módulo de habilidades blandas para supervisores.', responsable: 'Ana Torres', fecha: 'May 2026', estado: 'por_iniciar' },
    ],
    protocolo: null,
  },

  /* ── 6. Alejandra Rojas ── */
  {
    id: '6',
    nombre: 'Alejandra Rojas',
    iniciales: 'AR',
    cargo: 'Operaria de producción',
    area: 'Planta Norte',
    planta: 'Planta Norte',
    turno: 'Turno A',
    turnoHorario: '06:00 – 14:00',
    antiguedad: '3 años',
    sindicato: 'No sindicalizada',
    avatarColor: '#185FA5',
    nivelAlerta: 'observacion',
    tendencia: 'down',
    factoresPrincipales: ['Comportamiento'],
    estadoAlarma: 'Nuevo',
    senales: [
      { id: 'comportamiento_laboral', titulo: 'Comportamiento laboral', items: [
        { texto: 'Solicitud de cambio de turno reiterada (sin causa documentada)', nivel: 'activa', fecha: 'Abr 2026' },
      ]},
      { id: 'relacionamiento_interno', titulo: 'Relacionamiento interno', items: [
        { texto: 'Reducción de interacción con pares (observación supervisor)', nivel: 'observacion', fecha: 'Abr 2026' },
      ]},
      { id: 'conductas_graves', titulo: 'Conductas graves', items: [] },
      { id: 'contexto_desempeno', titulo: 'Contexto y desempeño', items: [] },
      { id: 'contexto_organizacional', titulo: 'Contexto organizacional', items: [] },
      { id: 'eventos_legales', titulo: 'Eventos con consecuencias legales', items: [] },
    ],
    acciones: [],
    protocolo: null,
  },

  /* ── 7. Luis Fuentes ── */
  {
    id: '7',
    nombre: 'Luis Fuentes',
    iniciales: 'LF',
    cargo: 'Operario de producción',
    area: 'Obras',
    planta: 'Obras',
    turno: 'Turno B',
    turnoHorario: '14:00 – 22:00',
    antiguedad: '7 años 2 meses',
    sindicato: 'Sindicato N°1',
    avatarColor: '#1D9E75',
    nivelAlerta: 'sin_senales',
    tendencia: 'down',
    factoresPrincipales: [],
    estadoAlarma: 'Sin alarma',
    senales: [
      { id: 'comportamiento_laboral', titulo: 'Comportamiento laboral', items: [] },
      { id: 'relacionamiento_interno', titulo: 'Relacionamiento interno', items: [] },
      { id: 'conductas_graves', titulo: 'Conductas graves', items: [] },
      { id: 'contexto_desempeno', titulo: 'Contexto y desempeño', items: [] },
      { id: 'contexto_organizacional', titulo: 'Contexto organizacional', items: [] },
      { id: 'eventos_legales', titulo: 'Eventos con consecuencias legales', items: [] },
    ],
    acciones: [],
    protocolo: null,
  },
]
