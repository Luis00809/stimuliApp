﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StimuliApp.Data;

#nullable disable

namespace StimuliApp.Migrations
{
    [DbContext(typeof(StimuliAppContext))]
    [Migration("20240326154932_ForeignKey")]
    partial class ForeignKey
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ClientStimSet", b =>
                {
                    b.Property<int>("ClientsId")
                        .HasColumnType("int");

                    b.Property<int>("StimSetsId")
                        .HasColumnType("int");

                    b.HasKey("ClientsId", "StimSetsId");

                    b.HasIndex("StimSetsId");

                    b.ToTable("ClientStimSet");
                });

            modelBuilder.Entity("ClientUser", b =>
                {
                    b.Property<int>("ClientsId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("ClientsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("ClientUser");
                });

            modelBuilder.Entity("StimSetStimuli", b =>
                {
                    b.Property<int>("StimSetsId")
                        .HasColumnType("int");

                    b.Property<int>("StimuliId")
                        .HasColumnType("int");

                    b.HasKey("StimSetsId", "StimuliId");

                    b.HasIndex("StimuliId");

                    b.ToTable("StimSetStimuli");
                });

            modelBuilder.Entity("StimuliApp.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("StimuliApp.Models.Round", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Answer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoundNumber")
                        .HasColumnType("int");

                    b.Property<string>("Target")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TrialId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TrialId");

                    b.ToTable("Rounds");
                });

            modelBuilder.Entity("StimuliApp.Models.StimSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("StimSets");
                });

            modelBuilder.Entity("StimuliApp.Models.Stimuli", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Group")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StimName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Stimuli");
                });

            modelBuilder.Entity("StimuliApp.Models.Trial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CardsOnScreen")
                        .HasColumnType("int");

                    b.Property<int?>("ClientId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("SetId")
                        .HasColumnType("int");

                    b.Property<int>("TotalCorrect")
                        .HasColumnType("int");

                    b.Property<int>("TotalTrials")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("SetId");

                    b.ToTable("Trials");
                });

            modelBuilder.Entity("StimuliApp.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ClientStimSet", b =>
                {
                    b.HasOne("StimuliApp.Models.Client", null)
                        .WithMany()
                        .HasForeignKey("ClientsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StimuliApp.Models.StimSet", null)
                        .WithMany()
                        .HasForeignKey("StimSetsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ClientUser", b =>
                {
                    b.HasOne("StimuliApp.Models.Client", null)
                        .WithMany()
                        .HasForeignKey("ClientsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StimuliApp.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StimSetStimuli", b =>
                {
                    b.HasOne("StimuliApp.Models.StimSet", null)
                        .WithMany()
                        .HasForeignKey("StimSetsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StimuliApp.Models.Stimuli", null)
                        .WithMany()
                        .HasForeignKey("StimuliId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StimuliApp.Models.Round", b =>
                {
                    b.HasOne("StimuliApp.Models.Trial", null)
                        .WithMany("Rounds")
                        .HasForeignKey("TrialId");
                });

            modelBuilder.Entity("StimuliApp.Models.Trial", b =>
                {
                    b.HasOne("StimuliApp.Models.Client", "Client")
                        .WithMany("Trials")
                        .HasForeignKey("ClientId");

                    b.HasOne("StimuliApp.Models.StimSet", "StimSet")
                        .WithMany("Trials")
                        .HasForeignKey("SetId");

                    b.Navigation("Client");

                    b.Navigation("StimSet");
                });

            modelBuilder.Entity("StimuliApp.Models.Client", b =>
                {
                    b.Navigation("Trials");
                });

            modelBuilder.Entity("StimuliApp.Models.StimSet", b =>
                {
                    b.Navigation("Trials");
                });

            modelBuilder.Entity("StimuliApp.Models.Trial", b =>
                {
                    b.Navigation("Rounds");
                });
#pragma warning restore 612, 618
        }
    }
}
