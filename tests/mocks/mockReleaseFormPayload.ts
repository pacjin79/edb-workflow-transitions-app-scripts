const payload = [
  {
    Timestamp: '2020-10-01T13:55:00.321Z',
    'Please enter release version': 'V14',
    'Link to release distribution 1':
      'https://get.enterprisedb.com/docs/EDB_Postgres_Advanced_Server_Installation_Guide_v10',
    'Link to release distribution 2': 'https://www.enterprisedb.com/docs/en/10.0/EPAS_Inst_Guide_v10/toc.html',
    'Link to release distribution 3': 'https://www.enterprisedb.com/repository-access-request',
    'Provide technical update for this release':
      'DB-682 - In case of error coming from standard_planner global pointer is not getting\nclean up and end up with server crash. Commit fix dangling pointer de-reference for\nglobal index candidates. [#1026986];\nDB-406 - Throw a proper error when ROWID used with partition table;\nDB-640 - Fix FF mode in Redwood to_char() datetime related functions;\nDB-639 - Protect (timestamp + number) and (timestamp - number) against overflow;\nRM43953 - Commit move the schema grant statement from edb-sys.sql to code, in order to fix the pg_upgrade for --no-redwood-compat mode;\nDB-592 - Fix pg_dump to not dump build-in extensions;\nDB-477- edbldr: Disallow using NULLIF as SQL expression evaluation is not supported in the direct load;\nDB-301- edbldr: Fix assorted issues where ZONED data input length is less than the\nprecision;',
  },
];

export { payload };
