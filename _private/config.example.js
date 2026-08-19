// Órale – Authentic Mexican Flavor Limited
// Plantilla de configuración para los generadores HACCP (ES/EN)
// Copiar como _private/config.js y completar con los datos reales.
// _private/config.js NO se commitea (ver .gitignore raíz).

module.exports = {
  empresa: "Nombre de la Empresa",
  cro: "000000",
  version: "1.4",
  fechaEmision: "1 de enero de 2026",
  fechaEmisionEN: "January 1, 2026",
  proximaRevision: "1 de enero de 2027",
  proximaRevisionEN: "January 1, 2027",

  contacto: {
    email: "correo@ejemplo.com",
    telefono: "+353 XX XXX XXXX"
  },

  responsables: {
    director: "Nombre Apellido",
    operaciones: "Nombre Apellido",
    chef: "Nombre Apellido"
  },

  hse: {
    premisesRef: "000000",
    oficial: "Nombre Apellido (correo@ejemplo.ie)"
  },

  outputPath: {
    es: 'HACCP_Orale_v1.4_ES.html',
    en: 'HACCP_Orale_v1.4_EN.html'
  },

  urls: {
    es: 'HACCP_Orale_v1.4_ES.html',
    en: 'HACCP_Orale_v1.4_EN.html'
  },

  formatosUrl: {
    base: 'docs/docxs',
    es: 'docs/docxs/es',
    en: 'docs/docxs/en'
  },
  congelador: {
    cajonesEmpresa: 0,
    cajonesParticular: 0,
    capacidadPorCajon: 0,
    totalEmpresa: 0,
    temperaturaMinima: -18
  },
  refrigerador: {
    nivelesEmpresa: 0,
    nivelesParticular: 0
  }
};
