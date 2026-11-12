# Cisco Packet Tracer: Switching & Layer 2 Security Lab

A completed Cisco Packet Tracer networking lab focused on VLAN segmentation, redundant switching, inter-VLAN routing, DHCP, and Layer 2 security. I built the environment, tested connectivity and security behavior, and documented both successful results and tests that remained inconclusive.

**Platform:** Cisco Packet Tracer 9.0.1  
**Lab status:** Completed and saved; documentation includes known limitations  
**Deliverables:** [Packet Tracer project (.pkt)](Ch11_17_Completed_Switching_Lab.pkt) | [Topology image](Screenshot%202026-11-11%20195239.png)

## Network topology

![Three-switch Packet Tracer topology with VLANs, client devices, and test systems](Screenshot%202026-11-11%20195239.png)

The design uses a Cisco 3560 multilayer core switch (**CORE-MLS1**), two Cisco 2960 access switches (**ACCESS-SW1** and **ACCESS-SW2**), and three inter-switch links forming a redundant triangle. Endpoints include four department PCs, a DHCP test client, a legitimate DHCP server, and an unauthorized DHCP server used in a controlled scenario.

| VLAN | Role | Addressing |
|---|---|---|
| 10 | STAFF | 192.168.10.0/24; gateway 192.168.10.1 |
| 20 | LAB | 192.168.20.0/24; gateway 192.168.20.1 |
| 30 | SERVERS | 192.168.30.0/24; gateway 192.168.30.1 |
| 50 | VTP-TEST | Temporary VLAN used to verify propagation |
| 99 | MANAGEMENT | Management VLAN |
| 999 | NATIVE-BLACKHOLE | Native VLAN configured on 802.1Q trunks |

Representative devices: STAFF-PC1 (`192.168.10.11`), STAFF-PC2 (`192.168.10.12`), LAB-PC1 (`192.168.20.11`), LAB-PC2 (`192.168.20.12`), and SERVER1 (`192.168.30.10`).

## What I configured

| Area | Implementation | Validation performed |
|---|---|---|
| Switching | VLANs, access-port assignment, 802.1Q trunks with native VLAN 999, DTP negotiation disabled on trunks | Checked trunk state, VLAN membership, MAC learning, and forwarding behavior |
| Redundancy | Spanning Tree Protocol across the three-switch topology | Inspected root/designated/alternate roles; tested link behavior and recovery |
| VLAN management | VTP server/client configuration | Checked propagation of VLAN 50 |
| Layer 3 | Core-switch SVIs and inter-VLAN routing | Tested reachability across VLAN 10, VLAN 20, and VLAN 30 |
| DHCP | Relay with `ip helper-address 192.168.30.10`; STAFF pool served from SERVER1 | Confirmed the test client received the intended address, gateway, and DHCP server |
| Port Security | One sticky MAC permitted on ACCESS-SW1 Fa0/1; shutdown on violation | Triggered a violation with a substituted device, then restored the authorized device and port |
| DHCP Snooping | Enabled on access switches with trust boundaries and a client binding | Confirmed legitimate lease/binding; rogue-offer blocking was not conclusively observed |
| Dynamic ARP Inspection | Enabled for VLAN 10 on ACCESS-SW1; infrastructure uplinks trusted | Confirmed active state and normal ARP/gateway connectivity; spoof blocking was not conclusively observed |

## Verified results

These are the observations recorded during the lab, not claims that every possible attack or failure case was tested.

| Check | Observed outcome |
|---|---|
| DHCP test client address | `192.168.10.100/24` from `192.168.30.10`; gateway `192.168.10.1` |
| Ping to STAFF gateway (`192.168.10.1`) | Passed |
| Ping to LAB-PC1 (`192.168.20.11`) | Passed |
| Ping to SERVER1 (`192.168.30.10`) | Passed |
| DHCP Snooping binding on ACCESS-SW1 | VLAN 10, Fa0/4, `192.168.10.100` |
| Dynamic ARP Inspection on ACCESS-SW1 | Reported Active for VLAN 10 |
| Port Security on ACCESS-SW1 Fa0/1 | Secure-up after recovery; one MAC; shutdown violation mode |
| Core trunk links Gi0/1 and Gi0/2 | 802.1Q trunking with native VLAN 999 |
| STP | Loop-free forwarding roles observed on ACCESS-SW1 |

## Troubleshooting and lessons learned

**DAI trust is separate from DHCP Snooping trust.** Initially, Gigabit uplinks were still untrusted for ARP inspection. Configuring `ip arp inspection trust` on the relevant interfaces corrected the reported DAI trust state.

**A successful DHCP lease does not prove that a rogue offer was blocked.** With an unauthorized DHCP server connected on an untrusted access port, the test PC still received its lease from the legitimate server. Packet Tracer Simulation Mode reached its event-buffer limit, so I could not conclusively observe the rogue offer being dropped.

**An active security feature is not automatically a proven protection.** DAI reported Active, and normal ARP resolution worked, but the inspected packet counters showed zero. I did not demonstrate a blocked ARP-spoof attempt, so I have not marked that test as passed.

**Working connectivity is not the same as a fully hardened configuration.** The final trunk output allowed VLANs `1-1005`. Only the lab VLANs were required for the documented topology, but an explicitly restricted allowed-VLAN list was not part of the final saved state.

My main takeaway was to distinguish what I configured from what I actually verified. Commands such as `show interfaces trunk`, `show spanning-tree`, `show ip dhcp snooping binding`, and `show ip arp inspection` each answer a different question. A successful ping is useful evidence, but not a complete security test.

## Files and scope

- **[Download the completed Packet Tracer lab](Ch11_17_Completed_Switching_Lab.pkt)** to inspect the saved topology and device configurations in Cisco Packet Tracer 9.0.1.
- **[View the topology screenshot](Screenshot%202026-11-11%20195239.png)** to see the device layout. The disconnected ROGUE-PC was used for the Port Security violation/recovery exercise.

This is a self-directed simulated lab, not a production network. The documented tests reflect what I observed during the exercise. Individual device command-output transcripts were not captured for publication.

## Skills demonstrated

VLAN configuration · 802.1Q trunking · STP · VTP · switch virtual interfaces · inter-VLAN routing · DHCP relay · Port Security · DHCP Snooping · Dynamic ARP Inspection · network verification · troubleshooting documentation
