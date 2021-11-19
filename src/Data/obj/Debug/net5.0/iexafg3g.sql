IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Sexos] (
    [SexoId] int NOT NULL IDENTITY,
    [Descricao] varchar(15) NOT NULL,
    CONSTRAINT [PK_Sexos] PRIMARY KEY ([SexoId])
);
GO

CREATE TABLE [Usuarios] (
    [UsuarioId] int NOT NULL IDENTITY,
    [Nome] varchar(200) NOT NULL,
    [DataNascimento] datetime NOT NULL,
    [Email] varchar(100) NOT NULL,
    [Senha] varchar(30) NOT NULL,
    [Ativo] bit NOT NULL,
    [SexoId] int NOT NULL,
    CONSTRAINT [PK_Usuarios] PRIMARY KEY ([UsuarioId]),
    CONSTRAINT [FK_Usuarios_Sexos_SexoId] FOREIGN KEY ([SexoId]) REFERENCES [Sexos] ([SexoId]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Usuarios_SexoId] ON [Usuarios] ([SexoId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211117004001_CriacaoBanco', N'5.0.12');
GO

COMMIT;
GO

